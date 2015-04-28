# eslint-plugin-arrow-function

custom ESLint rule, ckecks arrow function literal.

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

this is begger, because conditio of if is arrow function, not comparison.
this should be like this, and you can notice it's not you expect.

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

`f` is arrow function which gets a as arguments and return result of `b ? c: d`.

this should be like this again.

```js
var a = 1, b = 2, c = 3, d = 4;
var f = (a) => b ? c: d;
```

you may notice what is this.


### space

The following patterns are considered warnings:

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

The following patterns are not warnings:

```js
() => {}
(a) => {}
a => a
() => {\n}
```

## Usage

```yaml
plugins:
  - arrow-function

rules:
  # Plugins
  arrow-function/parens : 2
  arrow-function/space  : 2
```

## License

MIT
