import { Lexer } from '@johanneslumpe/basic-lexer';

import { IAdditionalTokenData, ICssTokenType } from './types';
import { valueDeclaration } from './valueDeclaration';

export {
  IAdditionalTokenData,
  ICssCombinatorTokenType,
  ICssDataTokenType,
  ICssFunctionTokenType,
  ICssGroupTokenType,
  ICssMultiplierTokenType,
  ICssTokenType,
  ILexingError,
} from './types';

export { formatTokens } from './formatTokens';

export const lexValueDeclarationGrammar = (declaration: string) =>
  valueDeclaration(new Lexer<ICssTokenType, IAdditionalTokenData>(declaration));
