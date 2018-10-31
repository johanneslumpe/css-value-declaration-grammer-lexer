import { Lexer } from '@johanneslumpe/basic-lexer';

import {
  IAdditionalTokenData,
  ICssDataTokenType,
  ICssMultiplierTokenType,
  ICssTokenType,
  ILexingError,
} from '../types';
import { valueDeclaration } from '../valueDeclaration';
import {
  getBaseLexingErrorToken,
  getDataTypeToken,
  getDoubleAmpersandToken,
  getDoubleBarToken,
  getFunctionEndToken,
  getFunctionStartToken,
  getGroupEndToken,
  getGroupStartToken,
  getJuxtapositionToken,
  getKeywordToken,
  getLiteralToken,
  getMultiplierToken,
  getSingleBarToken,
} from './utils/tokens';

describe('valueDeclaration', () => {
  // constant characters
  const COMBINATORS = ['&&', ' ', '|', '||'];
  const MULTIPLIERS = ['+', '*', '?', '#', '!'];
  const LITERALS = [',', '/'];
  const BASE_LEXING_ERROR_TOKEN = getBaseLexingErrorToken();

  describe('groups', () => {
    it('should be able to lex an empty group', () => {
      const l = valueDeclaration(new Lexer('[ ]'));
      expect(l.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getGroupEndToken(2, 3),
      ]);
    });

    it('should emit a lexing error token if brackets are not properly closed', () => {
      const l = valueDeclaration(new Lexer('[ test'));
      expect(l.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getKeywordToken(2, 6, 'test'),
        BASE_LEXING_ERROR_TOKEN,
      ]);

      expect(l.emittedTokens[2].value.toLowerCase()).toMatch(
        /bracket count mismatch/,
      );
    });

    it('should emit a lexing error token if brackts are in the wrong order', () => {
      const l = valueDeclaration(new Lexer('] ['));
      expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);
      expect(l.emittedTokens[0].value.toLowerCase()).toMatch(
        /invalid bracket closing position/,
      );
    });

    it('should be able to lex nested groups', () => {
      const l = valueDeclaration(new Lexer('[ [ [ ] ] ]'));
      expect(l.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getGroupStartToken(2, 3),
        getGroupStartToken(4, 5),
        getGroupEndToken(6, 7),
        getGroupEndToken(8, 9),
        getGroupEndToken(10, 11),
      ]);
    });

    it('should be able to lex nested functions in groups', () => {
      const l = valueDeclaration(new Lexer('[ func() ]'));

      expect(l.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getFunctionStartToken(2, 7, 'func('),
        getFunctionEndToken(7, 8),
        getGroupEndToken(9, 10),
      ]);
    });
  });

  describe('keywords', () => {
    it('should be able to lex a keyword', () => {
      const l = valueDeclaration(new Lexer('baseline'));
      expect(l.emittedTokens).toMatchObject([
        getKeywordToken(0, 8, 'baseline'),
      ]);
    });

    it('should allow numbers in keywords', () => {
      const l = valueDeclaration(new Lexer('jis90'));
      expect(l.emittedTokens).toMatchObject([getKeywordToken(0, 5, 'jis90')]);
    });

    it('should be able to lex keywords in a group', () => {
      const l = valueDeclaration(new Lexer('[ baseline keyword ]'));
      expect(l.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getKeywordToken(2, 10, 'baseline'),
        getJuxtapositionToken(10, 11),
        getKeywordToken(11, 18, 'keyword'),
        getGroupEndToken(19, 20),
      ]);
    });
  });

  describe('data types', () => {
    it('should be able to lex a basic data-type', () => {
      const l = valueDeclaration(new Lexer('<length>'));
      expect(l.emittedTokens).toMatchObject([
        getDataTypeToken(0, 8, '<length>'),
      ]);
    });

    it('should be able to lex a property data-type', () => {
      const l = valueDeclaration(new Lexer("<'some-property'>"));
      expect(l.emittedTokens).toMatchObject([
        getDataTypeToken(
          0,
          17,
          "<'some-property'>",
          ICssDataTokenType.PROPERTY,
        ),
      ]);
    });
    it('should emit a lexing error token if a data type is not closed', () => {
      const l = valueDeclaration(new Lexer('<length'));
      expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);

      expect(l.emittedTokens[0].value.toLowerCase()).toMatch(
        /invalid character sequence.*?>/,
      );
    });

    it('should emit a lexing error token if a property data type is not closed', () => {
      const l = valueDeclaration(new Lexer("<'length"));
      expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);

      expect(l.emittedTokens[0].value.toLowerCase()).toMatch(
        /invalid character sequence.*?'/,
      );
    });

    it('should be able to lex function references in data types', () => {
      const l = valueDeclaration(new Lexer('<blur()>'));
      expect(l.emittedTokens).toMatchObject([
        getDataTypeToken(0, 8, '<blur()>'),
      ]);
    });

    it('should emit a lexing token if a function references in a data type contains characters', () => {
      const l = valueDeclaration(new Lexer('<blur(a)>'));
      expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);
      expect(l.emittedTokens[0].value).toMatch(/expected closing "\)"/);
    });
  });

  describe('combinators', () => {
    describe('juxtaposition', () => {
      it('should not lex a juxtaposition after a function start or before a function end', () => {
        const l = valueDeclaration(new Lexer('fit-content( test )'));
        expect(l.emittedTokens).toMatchObject([
          getFunctionStartToken(0, 12, 'fit-content('),
          getKeywordToken(13, 17, 'test'),
          getFunctionEndToken(18, 19),
        ]);
      });

      it('should lex a juxtaposition between two adjacant groups', () => {
        const l = valueDeclaration(new Lexer('[ ] [ ]'));
        expect(l.emittedTokens).toMatchObject([
          getGroupStartToken(0, 1),
          getGroupEndToken(2, 3),
          getJuxtapositionToken(3, 4),
          getGroupStartToken(4, 5),
          getGroupEndToken(6, 7),
        ]);
      });

      it('should lex a juxtaposition between two keywords', () => {
        const l = valueDeclaration(new Lexer('baseline keyword'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 8, 'baseline'),
          getJuxtapositionToken(8, 9),
          getKeywordToken(9, 16, 'keyword'),
        ]);
      });

      it('should emit an error if a juxtaposition is the last token in a string', () => {
        const l = valueDeclaration(new Lexer('test '));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 4, 'test'),
          BASE_LEXING_ERROR_TOKEN,
        ]);
        expect(l.emittedTokens[1].value.toLowerCase()).toMatch(
          /juxtaposition.*?end.*?string/,
        );
      });

      it('should lex a juxtaposition in a group with an optional keyword', () => {
        const l = valueDeclaration(new Lexer('[a? b]'));
        expect(l.emittedTokens).toMatchObject([
          getGroupStartToken(0, 1),
          getKeywordToken(1, 2, 'a'),
          getMultiplierToken(2, 3, ICssMultiplierTokenType.QUESTION_MARK, '?'),
          getJuxtapositionToken(3, 4),
          getKeywordToken(4, 5, 'b'),
          getGroupEndToken(5, 6),
        ]);
      });

      describe('literals', () => {
        LITERALS.forEach(literal => {
          it(`should lex a juxtaposition after a "${literal}"`, () => {
            const l = valueDeclaration(new Lexer(`${literal} test`));
            expect(l.emittedTokens).toMatchObject([
              getLiteralToken(0, literal.length, literal),
              getJuxtapositionToken(literal.length, literal.length + 1),
              getKeywordToken(literal.length + 1, literal.length + 5, 'test'),
            ]);
          });
        });
      });
    });

    describe('single bar', () => {
      it('should be able to lex a single bar token', () => {
        const l = valueDeclaration(new Lexer('|'));
        expect(l.emittedTokens).toMatchObject([getSingleBarToken(0, 1)]);
      });

      it('should be able to lex a double bar token', () => {
        const l = valueDeclaration(new Lexer('||'));
        expect(l.emittedTokens).toMatchObject([getDoubleBarToken(0, 2)]);
      });
      it('should be able to lex a combination of groups, keywords data types and single bars', () => {
        const l = valueDeclaration(
          new Lexer('[ left | bottom | <length-percentage> ]'),
        );
        expect(l.emittedTokens).toMatchObject([
          getGroupStartToken(0, 1),
          getKeywordToken(2, 6, 'left'),
          getSingleBarToken(7, 8),
          getKeywordToken(9, 15, 'bottom'),
          getSingleBarToken(16, 17),
          getDataTypeToken(18, 37, '<length-percentage>'),
          getGroupEndToken(38, 39),
        ]);
      });
    });

    describe('double ampersand', () => {
      it('should be able to lex a double ampersand token', () => {
        const l = valueDeclaration(new Lexer('&&'));
        expect(l.emittedTokens).toMatchObject([getDoubleAmpersandToken(0, 2)]);
      });

      it('should emit a lexing error if a single ampersand is located at the end of the string', () => {
        // EOS
        const l = valueDeclaration(new Lexer('&'));
        expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);
      });

      it('should emit a lexing error if a single ampersand is located within a string', () => {
        // invalid next character
        const l = valueDeclaration(new Lexer('& '));
        expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);
        expect(l.emittedTokens[0].value.toLowerCase()).toMatch(
          /unexpected character/,
        );
      });
    });

    describe('sequential combinators', () => {
      const keywordToken = getKeywordToken(0, 7, 'smaller');
      const getLexerForCombinators = (
        combinator: string,
        otherCombinator: string,
      ): Lexer<ICssTokenType | ILexingError, IAdditionalTokenData> =>
        valueDeclaration(
          new Lexer<ICssTokenType | ILexingError, IAdditionalTokenData>(
            `smaller${combinator}${otherCombinator}`,
          ),
        );

      // const combinatorsWithoutJuxtaposition = COMBINATORS.filter(x => x !== ' ');
      COMBINATORS.forEach(combinator => {
        COMBINATORS.forEach(otherCombinator => {
          // two single bars make a double bar, so ignore them here
          // juxtaposition are also a special case, so we ignore them as well
          if (
            (combinator === '|' && otherCombinator === '|') ||
            combinator === ' ' ||
            otherCombinator === ' '
          ) {
            return;
          }
          it(`should emit an error token if "${combinator}" is followed by "${otherCombinator}" `, () => {
            const l = getLexerForCombinators(combinator, otherCombinator);
            expect(l.emittedTokens).toMatchObject([
              keywordToken,
              {},
              BASE_LEXING_ERROR_TOKEN,
            ]);
          });
        });
      });
    });
  });

  describe('functions', () => {
    it('should be able to lex a function value', () => {
      const l = valueDeclaration(new Lexer('matrix3d()'));
      expect(l.emittedTokens).toMatchObject([
        getFunctionStartToken(0, 9, 'matrix3d('),
        getFunctionEndToken(9, 10),
      ]);
    });

    it('should be able to lex a function value with a group inside', () => {
      const l = valueDeclaration(new Lexer('matrix3d( [ ] )'));
      expect(l.emittedTokens).toMatchObject([
        getFunctionStartToken(0, 9, 'matrix3d('),
        getGroupStartToken(10, 11),
        getGroupEndToken(12, 13),
        getFunctionEndToken(14, 15),
      ]);
    });

    it('should emit a lexing error token if parentheses are not properly closed', () => {
      const l = valueDeclaration(new Lexer('calc( test'));
      expect(l.emittedTokens).toMatchObject([
        getFunctionStartToken(0, 5, 'calc('),
        getKeywordToken(6, 10, 'test'),
        BASE_LEXING_ERROR_TOKEN,
      ]);

      expect(l.emittedTokens[2].value.toLowerCase()).toMatch(
        /parentheses count mismatch/,
      );
    });

    it('should emit a lexing error token if parentheses and brackets are incorrectly nested', () => {
      const l1 = valueDeclaration(new Lexer('[ calc( test ] )'));
      expect(l1.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getFunctionStartToken(2, 7, 'calc('),
        getKeywordToken(8, 12, 'test'),
        BASE_LEXING_ERROR_TOKEN,
      ]);

      expect(l1.emittedTokens[3].value.toLowerCase()).toMatch(
        /invalid bracket closing/,
      );

      const l2 = valueDeclaration(new Lexer('calc( [ test ) ]'));

      expect(l2.emittedTokens).toMatchObject([
        getFunctionStartToken(0, 5, 'calc('),
        getGroupStartToken(6, 7),
        getKeywordToken(8, 12, 'test'),
        BASE_LEXING_ERROR_TOKEN,
      ]);

      expect(l2.emittedTokens[3].value.toLowerCase()).toMatch(
        /invalid parenthesis closing/,
      );
    });
  });

  describe('multipliers', () => {
    describe('*', () => {
      it('should be able to lex `*`', () => {
        const l = valueDeclaration(new Lexer('smaller*'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(7, 8, ICssMultiplierTokenType.ASTERISK),
        ]);
      });
    });

    describe('+', () => {
      it('should be able to lex `+`', () => {
        const l = valueDeclaration(new Lexer('smaller+'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(7, 8, ICssMultiplierTokenType.PLUS),
        ]);
      });
    });
    describe('?', () => {
      it('should be able to lex `?`', () => {
        const l = valueDeclaration(new Lexer('smaller?'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(7, 8, ICssMultiplierTokenType.QUESTION_MARK),
        ]);
      });
    });
    describe('!', () => {
      it('should be able to lex `!`', () => {
        const l = valueDeclaration(new Lexer('[]!'));
        expect(l.emittedTokens).toMatchObject([
          getGroupStartToken(0, 1),
          getGroupEndToken(1, 2),
          getMultiplierToken(2, 3, ICssMultiplierTokenType.EXCLAMATION_MARK),
        ]);
      });

      it('should not allow `!` behind keywords, functions, data types or combinators', () => {
        const testValues = {
          '<length>!': [
            getDataTypeToken(0, 8, '<length>'),
            BASE_LEXING_ERROR_TOKEN,
          ],
          'calc()!': [
            getFunctionStartToken(0, 5, 'calc('),
            getFunctionEndToken(5, 6),
            BASE_LEXING_ERROR_TOKEN,
          ],
          'smaller!': [
            getKeywordToken(0, 7, 'smaller'),
            BASE_LEXING_ERROR_TOKEN,
          ],
        };

        Object.entries(testValues).forEach(([key, tokenArray]) => {
          const l = valueDeclaration(new Lexer(key));
          expect(l.emittedTokens).toMatchObject(tokenArray);
          expect(
            l.emittedTokens[l.emittedTokens.length - 1].value.toLowerCase(),
          ).toMatch(/invalid multiplier position/);
        });
      });
    });

    describe('#', () => {
      it('should be able to lex `#`', () => {
        const l = valueDeclaration(new Lexer('smaller#'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(7, 8, ICssMultiplierTokenType.HASH_MARK),
        ]);
      });
    });

    it('should not allow multipliers to occur after multipliers', () => {
      const multipliers = {
        '#': getMultiplierToken(7, 8, ICssMultiplierTokenType.HASH_MARK),
        '*': getMultiplierToken(7, 8, ICssMultiplierTokenType.ASTERISK),
        '+': getMultiplierToken(7, 8, ICssMultiplierTokenType.PLUS),
        '?': getMultiplierToken(7, 8, ICssMultiplierTokenType.QUESTION_MARK),
      };
      Object.entries(multipliers).forEach(([multiplier, token]) => {
        const l1 = valueDeclaration(
          new Lexer(`smaller${multiplier}${multiplier}`),
        );
        expect(l1.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          token,
          BASE_LEXING_ERROR_TOKEN,
        ]);
      });

      // `!` is only for groups
      const l2 = valueDeclaration(new Lexer(`[]!!`));
      expect(l2.emittedTokens).toMatchObject([
        getGroupStartToken(0, 1),
        getGroupEndToken(1, 2),
        getMultiplierToken(2, 3, ICssMultiplierTokenType.EXCLAMATION_MARK),
        BASE_LEXING_ERROR_TOKEN,
      ]);
    });

    it('should not allow multipliers to occur after combinators', () => {
      const keywordToken = getKeywordToken(0, 7, 'smaller');
      const getLexerForMultiplierAndCombinator = (
        combinator: string,
        multiplier: string,
      ): Lexer<ICssTokenType | ILexingError, IAdditionalTokenData> =>
        valueDeclaration(
          new Lexer<ICssTokenType | ILexingError, IAdditionalTokenData>(
            `smaller ${combinator} ${multiplier}`,
          ),
        );

      COMBINATORS.forEach(combinator => {
        MULTIPLIERS.forEach(multiplier => {
          const l = getLexerForMultiplierAndCombinator(combinator, multiplier);
          expect(l.emittedTokens).toMatchObject([
            keywordToken,
            {},
            BASE_LEXING_ERROR_TOKEN,
          ]);
        });
      });
    });

    describe('`{}`', () => {
      it('should be able to lex `{x,y}`', () => {
        const l1 = valueDeclaration(new Lexer('smaller{1,2}'));
        expect(l1.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(
            7,
            12,
            ICssMultiplierTokenType.CURLY_BRACES,
            '{1,2}',
          ),
        ]);
      });

      it('should be able to lex `{x,}`', () => {
        const l = valueDeclaration(new Lexer('smaller{1,}'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(
            7,
            11,
            ICssMultiplierTokenType.CURLY_BRACES,
            '{1,}',
          ),
        ]);
      });

      it('should be able to lex `{x}`', () => {
        const l = valueDeclaration(new Lexer('smaller{1}'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          getMultiplierToken(
            7,
            10,
            ICssMultiplierTokenType.CURLY_BRACES,
            '{1}',
          ),
        ]);
      });

      it('should emit a lexing error token if {} multiplier is not closed', () => {
        const l = valueDeclaration(new Lexer('smaller{1,2'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          BASE_LEXING_ERROR_TOKEN,
        ]);

        expect(l.emittedTokens[1].value.toLowerCase()).toMatch(
          /unexpected character.*?expected "}"/,
        );
      });

      it('should emit a lexing error token if no number is present after `{`', () => {
        const l = valueDeclaration(new Lexer('smaller{}'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          BASE_LEXING_ERROR_TOKEN,
        ]);

        expect(l.emittedTokens[1].value.toLowerCase()).toMatch(
          /expected a number/,
        );
      });

      it('should emit a lexing error token if `{` appers before the end of a string', () => {
        const l = valueDeclaration(new Lexer('smaller{'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          BASE_LEXING_ERROR_TOKEN,
        ]);

        expect(l.emittedTokens[1].value.toLowerCase()).toMatch(
          /expected a number/,
        );
      });

      it('should emit a lexing error token if `{x` is not followed by a `,`', () => {
        const l = valueDeclaration(new Lexer('smaller{1'));
        expect(l.emittedTokens).toMatchObject([
          getKeywordToken(0, 7, 'smaller'),
          BASE_LEXING_ERROR_TOKEN,
        ]);

        expect(l.emittedTokens[1].value.toLowerCase()).toMatch(/expected ","/);
      });
    });
  });

  describe('literal characters', () => {
    describe(',', () => {
      it('should be able to lex `,`', () => {
        const l = valueDeclaration(new Lexer(','));
        expect(l.emittedTokens).toMatchObject([getLiteralToken(0, 1, ',')]);
      });
    });

    describe('/', () => {
      it('should be able to lex `/`', () => {
        const l = valueDeclaration(new Lexer('/'));
        expect(l.emittedTokens).toMatchObject([getLiteralToken(0, 1, '/')]);
      });
    });
  });

  describe('misc', () => {
    it('should return an error token for an invalid character', () => {
      const l = valueDeclaration(new Lexer('$'));
      expect(l.emittedTokens).toMatchObject([BASE_LEXING_ERROR_TOKEN]);

      expect(l.emittedTokens[0].value.toLowerCase()).toMatch(
        /invalid character/,
      );
    });
  });
});
