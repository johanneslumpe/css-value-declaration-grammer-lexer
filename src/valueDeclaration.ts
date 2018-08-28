import { EOS, IBaseLexToken, Lexer } from '@johanneslumpe/basic-lexer';

import {
  CssTokenSubType,
  IAdditionalTokenData,
  ICssCombinatorTokenType,
  ICssDataTokenType,
  ICssFunctionTokenType,
  ICssGroupTokenType,
  ICssMultiplierTokenType,
  ICssTokenType,
  ILexingError,
} from './types';

type LexToken = IBaseLexToken<
  ICssTokenType | ILexingError,
  IAdditionalTokenData
>;

type CSSTokenLexer = Lexer<ICssTokenType | ILexingError, IAdditionalTokenData>;

/**
 * The state function pattern is inspired by a talk on lexing in Go by Rob Pike
 */
type stateFn = (lexer: CSSTokenLexer) => stateFn | undefined;

export const getTokenSubType = (
  token?: LexToken,
): CssTokenSubType | undefined => token && token.data && token.data.subType;

const error = (errorMessage: string) => (lexer: CSSTokenLexer): undefined => {
  lexer.emitError(ILexingError.LEXING_ERROR, errorMessage);
  return undefined;
};

const juxtaposition = (lexer: CSSTokenLexer): stateFn => {
  const prevToken = lexer.lookBehind();
  const next = lexer.lookAhead();
  const prevTokenType = prevToken && prevToken.type;
  const prevTokenSubType = getTokenSubType(prevToken);

  if (next === EOS) {
    return error('A juxtaposition cannot appear at the end of the string.');
  }

  // a juxtaposition can only appear between
  // - keywords
  // - groups
  // - data types
  // - literals
  const followsValidToken =
    prevTokenType === ICssTokenType.LITERAL ||
    prevTokenType === ICssTokenType.KEYWORD ||
    prevTokenType === ICssTokenType.DATA_TYPE ||
    (prevTokenType === ICssTokenType.GROUP &&
      prevTokenSubType === ICssGroupTokenType.GROUP_END);

  if (
    !followsValidToken ||
    // ignore the juxtaposition if the next character is:
    // - a combinator
    // - a space
    ' |&})]'.indexOf(next) > -1
  ) {
    lexer.ignore();
  } else {
    lexer.emit(ICssTokenType.COMBINATOR, {
      subType: ICssCombinatorTokenType.JUXTAPOSITION,
    });
  }
  return declaration;
};

// keywords
const validCharForKeyword = (char: string) => {
  const charCode = char.charCodeAt(0);
  return (
    // A-Z
    (charCode >= 65 && charCode <= 90) ||
    // a-z
    (charCode >= 97 && charCode <= 122) ||
    // -
    charCode === 45 ||
    // 0-9
    numberPredicate(char)
  );
};

const keywordOrFunctionStart = (lexer: CSSTokenLexer): stateFn => {
  lexer.acceptRun(validCharForKeyword);
  const next = lexer.next();
  if (next === '(') {
    lexer.increaseParenDepth();
    lexer.emit(ICssTokenType.FUNCTION, {
      subType: ICssFunctionTokenType.FUNCTION_START,
    });
  } else {
    lexer.backup();
    lexer.emit(ICssTokenType.KEYWORD);
  }
  return declaration;
};

const functionEnd = (lexer: CSSTokenLexer): stateFn => {
  lexer.next();
  lexer.decreaseParenDepth();
  const token = lexer.lookBehindForTypes(
    ICssTokenType.GROUP,
    ICssTokenType.FUNCTION,
  );
  const tokenSubType = getTokenSubType(token);
  if (
    !token ||
    (tokenSubType !== ICssFunctionTokenType.FUNCTION_START &&
      tokenSubType !== ICssGroupTokenType.GROUP_END)
  ) {
    return error('Invalid parenthesis closing position');
  }
  lexer.emit(ICssTokenType.FUNCTION, {
    subType: ICssFunctionTokenType.FUNCTION_END,
  });
  return declaration;
};

const dataType = (lexer: CSSTokenLexer): stateFn => {
  lexer.next();
  let upcoming = lexer.lookAhead();
  const isPropertyDataType = upcoming === "'";
  // we want to distinguish the following types:
  // <datatype>
  // <'property-type'>

  if (isPropertyDataType) {
    lexer.next();
  }

  lexer.acceptRun(validCharForKeyword);

  // allow for function references
  // e.g. `<blur()>`
  upcoming = lexer.lookAhead();
  if (upcoming === '(') {
    lexer.next();
    const next = lexer.next();
    if (next !== ')') {
      return error(
        `Invalid character sequence, expected closing ")", saw ${next.toString()}`,
      );
    }
  }

  // ensure single quotes are properly closed
  if (isPropertyDataType) {
    const closingSingleQuote = lexer.next();
    if (closingSingleQuote !== "'") {
      return error(
        `Invalid character sequence, expected closing "'", saw ${closingSingleQuote.toString()}`,
      );
    }
  }

  // ensure tag is properly closed
  const closingTag = lexer.next();
  if (closingTag !== '>') {
    return error(
      `Invalid character sequence, expected closing ">", saw ${closingTag.toString()}`,
    );
  }

  lexer.emit(ICssTokenType.DATA_TYPE, {
    subType: isPropertyDataType
      ? ICssDataTokenType.PROPERTY
      : ICssDataTokenType.BASIC,
  });
  return declaration;
};

const bar = (lexer: CSSTokenLexer): stateFn => {
  const next = lexer.next();
  if (next === '|') {
    lexer.emit(ICssTokenType.COMBINATOR, {
      subType: ICssCombinatorTokenType.DOUBLE_BAR,
    });
  } else {
    lexer.backup();
    lexer.emit(ICssTokenType.COMBINATOR, {
      subType: ICssCombinatorTokenType.SINGLE_BAR,
    });
  }
  return declaration;
};

const doubleAmpersand = (lexer: CSSTokenLexer): stateFn => {
  const next = lexer.next();
  if (next !== '&') {
    return error(
      `Unexpected character. Expected & to be followed by another &, received: "${next.toString()}"`,
    );
  }

  lexer.emit(ICssTokenType.COMBINATOR, {
    subType: ICssCombinatorTokenType.DOUBLE_AMPERSAND,
  });
  return declaration;
};

const groupStart = (lexer: CSSTokenLexer): stateFn => {
  lexer.next();
  lexer.increaseBracketDepth();
  lexer.emit(ICssTokenType.GROUP, {
    subType: ICssGroupTokenType.GROUP_START,
  });
  return declaration;
};

const groupEnd = (lexer: CSSTokenLexer): stateFn => {
  lexer.next();
  const token = lexer.lookBehindForTypes(
    ICssTokenType.FUNCTION,
    ICssTokenType.GROUP,
  );
  const tokenSubType = getTokenSubType(token);

  if (
    !tokenSubType ||
    (tokenSubType !== ICssGroupTokenType.GROUP_START &&
      tokenSubType !== ICssFunctionTokenType.FUNCTION_END)
  ) {
    return error('Invalid bracket closing position');
  }

  lexer.decreaseBracketDepth();
  lexer.emit(ICssTokenType.GROUP, {
    subType: ICssGroupTokenType.GROUP_END,
  });

  return declaration;
};

const numberPredicate = (char: string) => {
  const charCode = char.charCodeAt(0);
  // 0-9
  return charCode >= 48 && charCode <= 57;
};

const multiplierPositionError = (
  multiplierValue: ICssMultiplierTokenType | undefined,
  token?: LexToken,
): string =>
  `Invalid multiplier position. The \`${multiplierValue}\` multiplier was appended to: "${token &&
    token.value}`;

const exclamationMarkMultiplier = (lexer: CSSTokenLexer): stateFn => {
  const lastToken = lexer.lookBehind();
  const lastTokenSubType = getTokenSubType(lastToken);
  if (lastTokenSubType !== ICssGroupTokenType.GROUP_END) {
    return error(
      multiplierPositionError(
        ICssMultiplierTokenType.EXCLAMATION_MARK,
        lastToken,
      ),
    );
  }

  lexer.emit(ICssTokenType.MULTIPLIER, {
    subType: ICssMultiplierTokenType.EXCLAMATION_MARK,
  });

  return declaration;
};

const curlyBracesMultiplier = (lexer: CSSTokenLexer): stateFn => {
  let next = lexer.next();
  if (next === EOS) {
    return error('Unexpected end of string, expected a number');
  } else if (!numberPredicate(next)) {
    return error(`Expected a number for modifier, saw: ${next}`);
  }
  lexer.acceptRun(numberPredicate);

  next = lexer.next();
  if (next !== '}') {
    // we can only have a comma now
    if (next === EOS || next !== ',') {
      return error(
        `Unexpected character. Expected ",", saw: ${next.toString()}`,
      );
    }

    // maybe a number
    lexer.acceptRun(numberPredicate);

    next = lexer.next();
    if (next !== '}') {
      return error(
        `Unexpected character. Expected "}", saw: ${next.toString()}`,
      );
    }
  }

  lexer.emit(ICssTokenType.MULTIPLIER, {
    subType: ICssMultiplierTokenType.CURLY_BRACES,
  });

  return declaration;
};

const multiplier = (lexer: CSSTokenLexer): stateFn => {
  const nextChar = lexer.next();
  const lastToken = lexer.lookBehind();

  if (nextChar && lastToken && lastToken.type === ICssTokenType.COMBINATOR) {
    return error(
      `Multipliers cannot follow combinators. Found "${multiplier}" following "${
        lastToken.value
      }"`,
    );
  }

  const lastTokenSubType = getTokenSubType(lastToken);
  let subType: ICssMultiplierTokenType | undefined;

  switch (nextChar) {
    case '*':
      subType = ICssMultiplierTokenType.ASTERISK;
      break;
    case '?':
      subType = ICssMultiplierTokenType.QUESTION_MARK;
      break;
    case '+':
      subType = ICssMultiplierTokenType.PLUS;
      break;
    case '#':
      subType = ICssMultiplierTokenType.HASH_MARK;
      break;
    case '!':
      return exclamationMarkMultiplier;
    case '{':
      return curlyBracesMultiplier;
  }

  if (lastTokenSubType === subType) {
    return error(multiplierPositionError(subType, lastToken));
  }

  if (subType) {
    lexer.emit(ICssTokenType.MULTIPLIER, {
      subType,
    });
  } else {
    // This should never be hit
    return error('Could not lex multiplier');
  }

  return declaration;
};

const handleEOS = (lexer: CSSTokenLexer): stateFn | undefined => {
  const { currentBracketDepth, currentParenDepth } = lexer;
  if (currentBracketDepth !== 0) {
    return error('Bracket count mismatch');
  } else if (currentParenDepth !== 0) {
    return error('Parentheses count mismatch');
  }
  return undefined;
};

const combinator = (lexer: CSSTokenLexer): stateFn => {
  const prevToken = lexer.lookBehind();
  const char = lexer.next();

  // juxtapositions are handled separately in their own function
  // they can follow other combinators because they might just be normal
  // spaces and not actually combinators
  if (
    prevToken &&
    prevToken.type === ICssTokenType.COMBINATOR &&
    char !== ' '
  ) {
    return error('Combinators cannot appear after other combinators');
  }
  switch (char) {
    case ' ':
      return juxtaposition;
    case '|':
      return bar;
    case '&':
      return doubleAmpersand;
  }

  // should never be hit
  return error(`Unexpected combinator: ${char.toString()}`);
};

const literal = (lexer: CSSTokenLexer): stateFn => {
  lexer.next();
  lexer.emit(ICssTokenType.LITERAL);
  return declaration;
};

const declaration = (lexer: CSSTokenLexer): stateFn | undefined => {
  const upcoming = lexer.lookAhead();

  switch (upcoming) {
    case '[':
      return groupStart;
    case ']':
      return groupEnd;
    case ' ':
    case '|':
    case '&':
      return combinator;
    case ')':
      return functionEnd;
    case '<':
      return dataType;
    case '*':
    case '?':
    case '+':
    case '!':
    case '#':
    case '{':
      return multiplier;
    case ',':
    case '/':
      return literal;
    case EOS:
      return handleEOS;
  }

  if (validCharForKeyword(upcoming)) {
    return keywordOrFunctionStart;
  }

  return error(`Invalid character: "${lexer.next().toString()}"`);
};

/**
 * Lexing entry function
 * @param lexer
 */
export const valueDeclaration = (lexer: CSSTokenLexer) => {
  let state: stateFn | undefined = declaration;
  while (state !== undefined) {
    state = state(lexer);
  }
  return lexer;
};
