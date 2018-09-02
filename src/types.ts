/**
 * The possible token types we can lex
 */
export enum ICssTokenType {
  COMBINATOR = 'COMBINATOR',
  KEYWORD = 'KEYWORD',
  DATA_TYPE = 'DATA_TYPE',
  MULTIPLIER = 'MULTIPLIER',
  FUNCTION = 'FUNCTION',
  GROUP = 'GROUP',
  LITERAL = 'LITERAL',
}

/**
 * Subtypes for the `FUNCTION` token type
 */
export enum ICssFunctionTokenType {
  FUNCTION_START = 'FUNCTION_START',
  FUNCTION_END = 'FUNCTION_END',
}

/**
 * Subtypes for the `GROUP` token type
 */
export enum ICssGroupTokenType {
  GROUP_START = 'GROUP_START',
  GROUP_END = 'GROUP_END',
}

/**
 * Subtypes for the `DATA_TYPE` token type
 */
export enum ICssDataTokenType {
  BASIC = 'BASIC',
  PROPERTY = 'PROPERTY',
}

/**
 * Subtypes for the `COMBINATOR` token type
 */
export enum ICssCombinatorTokenType {
  JUXTAPOSITION = 'JUXTAPOSITION',
  SINGLE_BAR = 'SINGLE_BAR',
  DOUBLE_BAR = 'DOUBLE_BAR',
  DOUBLE_AMPERSAND = 'DOUBLE_AMPERSAND',
}

/**
 * Subtypes for the `MULTIPLIER` token type
 */
export enum ICssMultiplierTokenType {
  ASTERISK = 'ASTERISK',
  PLUS = 'PLUS',
  HASH_MARK = 'HASH_MARK',
  QUESTION_MARK = 'QUESTION_MARK',
  EXCLAMATION_MARK = 'EXCLAMATION_MARK',
  CURLY_BRACES = 'CURLY_BRACES',
}

/**
 * Using an enum here so we can refer to an enum instead of the plain
 * string value
 */
export enum ILexingError {
  LEXING_ERROR = 'LEXING_ERROR',
}

export type CssTokenSubType =
  | ICssCombinatorTokenType
  | ICssDataTokenType
  | ICssFunctionTokenType
  | ICssGroupTokenType
  | ICssMultiplierTokenType;

export interface IAdditionalTokenData {
  /**
   * The token sub type.
   */
  subType: CssTokenSubType;
}
