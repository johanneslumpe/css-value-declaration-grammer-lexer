import { IBaseLexToken } from '@johanneslumpe/basic-lexer';

import {
  IAdditionalTokenData,
  ICssFunctionTokenType,
  ICssGroupTokenType,
  ICssTokenType,
  ILexingError,
} from './types';
import { getTokenSubType } from './valueDeclaration';

/**
 * Formats the given tokens into a readable declaration output
 * @param tokens
 */
export const formatTokens = (
  tokens: Array<
    IBaseLexToken<ICssTokenType | ILexingError, IAdditionalTokenData>
  >,
  padding = 60,
  paddingChar = ' ',
): string => {
  let currentIndent = 0;
  let result = '';
  tokens.forEach(token => {
    const subType = getTokenSubType(token);
    if (
      subType === ICssGroupTokenType.GROUP_END ||
      subType === ICssFunctionTokenType.FUNCTION_END
    ) {
      currentIndent -= 2;
    }
    result += `${`${' '.repeat(currentIndent)}${token.value}`.padEnd(
      padding,
      paddingChar,
    )}${token.type}${
      token.data && token.data.subType ? ` (${token.data.subType})` : ''
    } (${token.startPos}, ${token.endPos})\n`;
    if (
      subType === ICssGroupTokenType.GROUP_START ||
      subType === ICssFunctionTokenType.FUNCTION_START
    ) {
      currentIndent += 2;
    }
  });

  return result.trim();
};
