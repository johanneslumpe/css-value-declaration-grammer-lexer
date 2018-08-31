import { formatTokens } from '../formatTokens';
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

describe('formatTokens', () => {
  it('should output a formatted view of the passed-in tokens', () => {
    const result = formatTokens([
      // positions don't matter here
      // we only care about formatting
      getGroupStartToken(0, 1),
      getKeywordToken(2, 3, 'keyword1'),
      getSingleBarToken(4, 5),
      getKeywordToken(6, 7, 'keyword2'),
      getGroupEndToken(8, 9),
    ]);

    const output = [
      '[                                                           GROUP (GROUP_START) (0, 1)',
      '  keyword1                                                  KEYWORD (2, 3)',
      '  |                                                         COMBINATOR (SINGLE_BAR) (4, 5)',
      '  keyword2                                                  KEYWORD (6, 7)',
      ']                                                           GROUP (GROUP_END) (8, 9)',
    ];
    expect(result).toBe(output.join('\n'));
  });
});
