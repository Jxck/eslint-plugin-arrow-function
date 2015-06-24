# eslint-plugin-arrow-function

custom ESLint rule, checks arrow function literal.

## Rule Details

### parens

The following patterns are considered warnings:

```js
a => {}
a => a
a => {\n}
a.then(foo => {});
a.then(foo => a);
a(foo => { if (true) {}; });
```

The following patterns are not warnings:

```js
() => {}
(a) => {}
(a) => a
(a) => {\n}
a.then((foo) => {});
a.then((foo) => { if (true) {}; });
```

this saves you from bizarre behavior like below

```js
var a = 1;
if (a => 2) {
 console.log('bigger');
} else {
 console.log('smaller')
};
```

this is better, because condition of if is arrow function, not comparison.
this should be like this, and you can notice it's not what you expect.

```js
var a = 1;
if ((a) => 2) {
 console.log('bigger');
} else {
 console.log('smaller')
};
```

same thing happens here.

```js
var a = 1, b = 2, c = 3, d = 4;
var f = a => b ? c: d;
// f = ?
```

`f` is arrow function which gets a as arguments and returns the result of `b ? c: d`.

this should be like this again.

```js
var a = 1, b = 2, c = 3, d = 4;
var f = (a) => b ? c: d;
```

you may notice what this is.

### no-condition

Disallow arrow function at places where a condition is expected.

The following patterns are considered warnings:

```js
if (a => 1) {}
while (a => 1) {}
for (var a = 1; a => 10; a++) {}
a => 1 ? 2 : 3
(a => 1) ? 2 : 3
```

Even if the arguments of the arrow function are wrapped with parens, this rule warns you about it.

### space

this rules takes one arguments of structure contains `before` and `after` property
and each property has bool value.

default configuration is `{ "before": true, "after": true }`.

`true` means there should have **one space** and `false` means **no space**.

The following patterns are considered warnings if `{ "before": true, "after": true }`.

```js
()=> {}
() =>{}
(a)=> {}
(a) =>{}
a =>a
a=> a
()=> {\n}
() =>{\n}
```

The following patterns are not warnings if `{ "before": true, "after": true }`.

```js
() => {}
(a) => {}
a => a
() => {\n}
```

The following patterns are not warnings if `{ "before": false, "after": false }`.

```js
()=>{}
(a)=>{}
a=>a
()=>{\n}
```

The following patterns are not warnings if `{ "before": true, "after": false }`.

```js
() =>{}
(a) =>{}
a =>a
() =>{\n}
```

The following patterns are not warnings if `{ "before": false, "after": true }`.

```js
()=> {}
(a)=> {}
a=> a
()=> {\n}
```

## Usage

```yaml
plugins:
  - arrow-function

rules:
  # Plugins
  arrow-function/parens : 2
  arrow-function/no-condition : 2
  arrow-function/space  : [2, { "before": true, "after": true } ]
```

## Contributors

- [teppeis](https://github.com/teppeis)

## Changelog

- v0.1.0 : fix rule name from `paren` to `parens` #4
- v0.0.3 : add configuration for `space`
- v0.0.2 : add `no-condition` rule. thanks to [teppeis](https://github.com/teppeis)
- v0.0.1 : first release

## License

MIT
