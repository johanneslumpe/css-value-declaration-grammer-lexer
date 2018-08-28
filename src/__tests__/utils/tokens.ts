import { IBaseLexToken } from '@johanneslumpe/basic-lexer';
import {
  IAdditionalTokenData,
  ICssCombinatorTokenType,
  ICssDataTokenType,
  ICssFunctionTokenType,
  ICssGroupTokenType,
  ICssMultiplierTokenType,
  ICssTokenType,
  ILexingError,
} from '../../types';

type LexToken = IBaseLexToken<ICssTokenType, IAdditionalTokenData>;

export const getGroupStartToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssGroupTokenType.GROUP_START,
  },
  endPos,
  startPos,
  type: ICssTokenType.GROUP,
  value: '[',
});

export const getGroupEndToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssGroupTokenType.GROUP_END,
  },
  endPos,
  startPos,
  type: ICssTokenType.GROUP,
  value: ']',
});

export const getJuxtapositionToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssCombinatorTokenType.JUXTAPOSITION,
  },
  endPos,
  startPos,
  type: ICssTokenType.COMBINATOR,
  value: ' ',
});

export const getSingleBarToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssCombinatorTokenType.SINGLE_BAR,
  },
  endPos,
  startPos,
  type: ICssTokenType.COMBINATOR,
  value: '|',
});

export const getDoubleBarToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssCombinatorTokenType.DOUBLE_BAR,
  },
  endPos,
  startPos,
  type: ICssTokenType.COMBINATOR,
  value: '||',
});

export const getDoubleAmpersandToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssCombinatorTokenType.DOUBLE_AMPERSAND,
  },
  endPos,
  startPos,
  type: ICssTokenType.COMBINATOR,
  value: '&&',
});

export const getKeywordToken = (
  startPos: number,
  endPos: number,
  value: string,
): LexToken => ({
  endPos,
  startPos,
  type: ICssTokenType.KEYWORD,
  value,
});

export const getLiteralToken = (
  startPos: number,
  endPos: number,
  value: string,
): LexToken => ({
  endPos,
  startPos,
  type: ICssTokenType.LITERAL,
  value,
});

export const getFunctionStartToken = (
  startPos: number,
  endPos: number,
  value: string,
): LexToken => ({
  data: {
    subType: ICssFunctionTokenType.FUNCTION_START,
  },
  endPos,
  startPos,
  type: ICssTokenType.FUNCTION,
  value,
});

export const getFunctionEndToken = (
  startPos: number,
  endPos: number,
): LexToken => ({
  data: {
    subType: ICssFunctionTokenType.FUNCTION_END,
  },
  endPos,
  startPos,
  type: ICssTokenType.FUNCTION,
  value: ')',
});

export const getDataTypeToken = (
  startPos: number,
  endPos: number,
  value: string,
  subType: ICssDataTokenType = ICssDataTokenType.BASIC,
): LexToken => ({
  data: {
    subType,
  },
  endPos,
  startPos,
  type: ICssTokenType.DATA_TYPE,
  value,
});

export const getBaseLexingErrorToken = () => ({
  type: ILexingError.LEXING_ERROR,
});

export const getMultiplierToken = (
  startPos: number,
  endPos: number,
  subType: ICssMultiplierTokenType,
  val: string = '',
): LexToken => {
  let value = val;
  if (!value) {
    switch (subType) {
      case ICssMultiplierTokenType.ASTERISK:
        value = '*';
        break;
      case ICssMultiplierTokenType.EXCLAMATION_MARK:
        value = '!';
        break;
      case ICssMultiplierTokenType.HASH_MARK:
        value = '#';
        break;
      case ICssMultiplierTokenType.PLUS:
        value = '+';
        break;
      case ICssMultiplierTokenType.QUESTION_MARK:
        value = '?';
        break;
    }
  }

  return {
    data: {
      subType,
    },
    endPos,
    startPos,
    type: ICssTokenType.MULTIPLIER,
    value,
  };
};
