[@johanneslumpe/css-value-declaration-grammer-lexer](../README.md) > ["formatTokens"](../modules/_formattokens_.md)

# External module: "formatTokens"

## Index

### Functions

* [formatTokens](_formattokens_.md#formattokens)

---

## Functions

<a id="formattokens"></a>

### `<Const>` formatTokens

▸ **formatTokens**(tokens: *`Array`<`IBaseLexToken`< [ICssTokenType](../enums/_types_.icsstokentype.md) &#124; [ILexingError](../enums/_types_.ilexingerror.md), [IAdditionalTokenData](../interfaces/_types_.iadditionaltokendata.md)>>*, padding?: *`number`*, paddingChar?: *`string`*): `string`

*Defined in [formatTokens.ts:16](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/formatTokens.ts#L16)*

Formats the given tokens into a readable declaration output

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| tokens | `Array`<`IBaseLexToken`< [ICssTokenType](../enums/_types_.icsstokentype.md) &#124; [ILexingError](../enums/_types_.ilexingerror.md), [IAdditionalTokenData](../interfaces/_types_.iadditionaltokendata.md)>> | - |   |
| `Default value` padding | `number` | 60 |
| `Default value` paddingChar | `string` | &quot; &quot; |

**Returns:** `string`

___

