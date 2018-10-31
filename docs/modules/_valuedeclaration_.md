[@johanneslumpe/css-value-declaration-grammer-lexer](../README.md) > ["valueDeclaration"](../modules/_valuedeclaration_.md)

# External module: "valueDeclaration"

## Index

### Type aliases

* [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)
* [CssValueDeclarationToken](_valuedeclaration_.md#cssvaluedeclarationtoken)
* [stateFn](_valuedeclaration_.md#statefn)

### Functions

* [bar](_valuedeclaration_.md#bar)
* [combinator](_valuedeclaration_.md#combinator)
* [curlyBracesMultiplier](_valuedeclaration_.md#curlybracesmultiplier)
* [dataType](_valuedeclaration_.md#datatype)
* [declaration](_valuedeclaration_.md#declaration)
* [doubleAmpersand](_valuedeclaration_.md#doubleampersand)
* [error](_valuedeclaration_.md#error)
* [exclamationMarkMultiplier](_valuedeclaration_.md#exclamationmarkmultiplier)
* [functionEnd](_valuedeclaration_.md#functionend)
* [getTokenSubType](_valuedeclaration_.md#gettokensubtype)
* [groupEnd](_valuedeclaration_.md#groupend)
* [groupStart](_valuedeclaration_.md#groupstart)
* [handleEOS](_valuedeclaration_.md#handleeos)
* [juxtaposition](_valuedeclaration_.md#juxtaposition)
* [keywordOrFunctionStart](_valuedeclaration_.md#keywordorfunctionstart)
* [literal](_valuedeclaration_.md#literal)
* [multiplier](_valuedeclaration_.md#multiplier)
* [multiplierPositionError](_valuedeclaration_.md#multiplierpositionerror)
* [numberPredicate](_valuedeclaration_.md#numberpredicate)
* [validCharForKeyword](_valuedeclaration_.md#validcharforkeyword)
* [valueDeclaration](_valuedeclaration_.md#valuedeclaration)

---

## Type aliases

<a id="csstokenlexer"></a>

###  CSSTokenLexer

**Ƭ CSSTokenLexer**: *`Lexer`< [ICssTokenType](../enums/_types_.icsstokentype.md) &#124; [ILexingError](../enums/_types_.ilexingerror.md), [IAdditionalTokenData](../interfaces/_types_.iadditionaltokendata.md)>*

*Defined in [valueDeclaration.ts:20](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L20)*

___
<a id="cssvaluedeclarationtoken"></a>

###  CssValueDeclarationToken

**Ƭ CssValueDeclarationToken**: *`IBaseLexToken`< [ICssTokenType](../enums/_types_.icsstokentype.md) &#124; [ILexingError](../enums/_types_.ilexingerror.md), [IAdditionalTokenData](../interfaces/_types_.iadditionaltokendata.md)>*

*Defined in [valueDeclaration.ts:15](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L15)*

___
<a id="statefn"></a>

###  stateFn

**Ƭ stateFn**: *`function`*

*Defined in [valueDeclaration.ts:25](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L25)*

The state function pattern is inspired by a talk on lexing in Go by Rob Pike

#### Type declaration
▸(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*):  [stateFn](_valuedeclaration_.md#statefn) &#124; `undefined`

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:**  [stateFn](_valuedeclaration_.md#statefn) &#124; `undefined`

___

## Functions

<a id="bar"></a>

### `<Const>` bar

▸ **bar**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:179](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L179)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="combinator"></a>

### `<Const>` combinator

▸ **combinator**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:371](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L371)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="curlybracesmultiplier"></a>

### `<Const>` curlyBracesMultiplier

▸ **curlyBracesMultiplier**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:275](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L275)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="datatype"></a>

### `<Const>` dataType

▸ **dataType**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:126](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L126)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="declaration"></a>

### `<Const>` declaration

▸ **declaration**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*):  [stateFn](_valuedeclaration_.md#statefn) &#124; `undefined`

*Defined in [valueDeclaration.ts:404](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L404)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:**  [stateFn](_valuedeclaration_.md#statefn) &#124; `undefined`

___
<a id="doubleampersand"></a>

### `<Const>` doubleAmpersand

▸ **doubleAmpersand**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:194](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L194)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="error"></a>

### `<Const>` error

▸ **error**(errorMessage: *`string`*): `(Anonymous function)`

*Defined in [valueDeclaration.ts:31](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L31)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| errorMessage | `string` |

**Returns:** `(Anonymous function)`

___
<a id="exclamationmarkmultiplier"></a>

### `<Const>` exclamationMarkMultiplier

▸ **exclamationMarkMultiplier**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:256](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L256)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="functionend"></a>

### `<Const>` functionEnd

▸ **functionEnd**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:105](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L105)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="gettokensubtype"></a>

### `<Const>` getTokenSubType

▸ **getTokenSubType**(token?: *[CssValueDeclarationToken](_valuedeclaration_.md#cssvaluedeclarationtoken)*):  [CssTokenSubType](_types_.md#csstokensubtype) &#124; `undefined`

*Defined in [valueDeclaration.ts:27](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L27)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` token | [CssValueDeclarationToken](_valuedeclaration_.md#cssvaluedeclarationtoken) |

**Returns:**  [CssTokenSubType](_types_.md#csstokensubtype) &#124; `undefined`

___
<a id="groupend"></a>

### `<Const>` groupEnd

▸ **groupEnd**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:217](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L217)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="groupstart"></a>

### `<Const>` groupStart

▸ **groupStart**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:208](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L208)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="handleeos"></a>

### `<Const>` handleEOS

▸ **handleEOS**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*):  [stateFn](_valuedeclaration_.md#statefn) &#124; `undefined`

*Defined in [valueDeclaration.ts:361](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L361)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:**  [stateFn](_valuedeclaration_.md#statefn) &#124; `undefined`

___
<a id="juxtaposition"></a>

### `<Const>` juxtaposition

▸ **juxtaposition**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:36](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L36)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="keywordorfunctionstart"></a>

### `<Const>` keywordOrFunctionStart

▸ **keywordOrFunctionStart**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:90](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L90)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="literal"></a>

### `<Const>` literal

▸ **literal**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:398](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L398)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="multiplier"></a>

### `<Const>` multiplier

▸ **multiplier**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): [stateFn](_valuedeclaration_.md#statefn)

*Defined in [valueDeclaration.ts:311](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L311)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |

**Returns:** [stateFn](_valuedeclaration_.md#statefn)

___
<a id="multiplierpositionerror"></a>

### `<Const>` multiplierPositionError

▸ **multiplierPositionError**(multiplierValue: * [ICssMultiplierTokenType](../enums/_types_.icssmultipliertokentype.md) &#124; `undefined`*, token?: *[CssValueDeclarationToken](_valuedeclaration_.md#cssvaluedeclarationtoken)*): `string`

*Defined in [valueDeclaration.ts:249](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L249)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| multiplierValue |  [ICssMultiplierTokenType](../enums/_types_.icssmultipliertokentype.md) &#124; `undefined`|
| `Optional` token | [CssValueDeclarationToken](_valuedeclaration_.md#cssvaluedeclarationtoken) |

**Returns:** `string`

___
<a id="numberpredicate"></a>

### `<Const>` numberPredicate

▸ **numberPredicate**(char: *`string`*): `boolean`

*Defined in [valueDeclaration.ts:243](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L243)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| char | `string` |

**Returns:** `boolean`

___
<a id="validcharforkeyword"></a>

### `<Const>` validCharForKeyword

▸ **validCharForKeyword**(char: *`string`*): `boolean`

*Defined in [valueDeclaration.ts:76](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L76)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| char | `string` |

**Returns:** `boolean`

___
<a id="valuedeclaration"></a>

### `<Const>` valueDeclaration

▸ **valueDeclaration**(lexer: *[CSSTokenLexer](_valuedeclaration_.md#csstokenlexer)*): `Lexer`< [COMBINATOR](../enums/_types_.icsstokentype.md#combinator) &#124; [KEYWORD](../enums/_types_.icsstokentype.md#keyword) &#124; [DATA_TYPE](../enums/_types_.icsstokentype.md#data_type) &#124; [MULTIPLIER](../enums/_types_.icsstokentype.md#multiplier) &#124; [FUNCTION](../enums/_types_.icsstokentype.md#function) &#124; [GROUP](../enums/_types_.icsstokentype.md#group) &#124; [LITERAL](../enums/_types_.icsstokentype.md#literal) &#124; [LEXING_ERROR](../enums/_types_.ilexingerror.md#lexing_error), [IAdditionalTokenData](../interfaces/_types_.iadditionaltokendata.md)>

*Defined in [valueDeclaration.ts:445](https://github.com/johanneslumpe/css-value-declaration-grammer-lexer/blob/2d14583/src/valueDeclaration.ts#L445)*

Lexing entry function

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| lexer | [CSSTokenLexer](_valuedeclaration_.md#csstokenlexer) |   |

**Returns:** `Lexer`< [COMBINATOR](../enums/_types_.icsstokentype.md#combinator) &#124; [KEYWORD](../enums/_types_.icsstokentype.md#keyword) &#124; [DATA_TYPE](../enums/_types_.icsstokentype.md#data_type) &#124; [MULTIPLIER](../enums/_types_.icsstokentype.md#multiplier) &#124; [FUNCTION](../enums/_types_.icsstokentype.md#function) &#124; [GROUP](../enums/_types_.icsstokentype.md#group) &#124; [LITERAL](../enums/_types_.icsstokentype.md#literal) &#124; [LEXING_ERROR](../enums/_types_.ilexingerror.md#lexing_error), [IAdditionalTokenData](../interfaces/_types_.iadditionaltokendata.md)>

___

