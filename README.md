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

### return-shorthand

Whether to require to use shorthand (no block statement) when using arrow
functions with only one return statement.

#### always

The following patterns are considered warnings:

```js
(bar) => { return { foo: bar }}
() => { return 5; }
(bar) => {
  return { foo: bar }
}
() => {
  return 5;
}
() => {
  return call(
    arg1, arg2
  );
}
```

The following patterns are not warnings:

```js
() => {
  var x = 2 + 2;
  return x;
}
(bar) => ({foo: bar})
() => 5
() => call(
  arg1, arg2
)
```

#### only-object

Only enforce object literal returns to be shorthand.

The following patterns are considered warnings:

```js
(bar) => { return { foo: bar }}
(bar) => {
  return { foo: bar }
}
```

The following patterns are not warnings:

```js
() => {
  var x = 2 + 2;
  return x;
}
() => { return 5; }
(bar) => ({foo: bar})
() => 5
() => call(
  arg1, arg2
)
() => {
  return 5;
}
() => {
  return call(
    arg1, arg2
  );
}
```

### never

The following patterns are considered warnings:

```js
(bar) => ({foo: bar})
() => 5
() => call(
  arg1, arg2
)
```

The following patterns are not warnings:

```js
(bar) => { return { foo: bar }}
(bar) => {
  return { foo: bar }
}
() => {
  var x = 2 + 2;
  return x;
}
() => { return 5; }
() => {
  return 5;
}
() => {
  return call(
    arg1, arg2
  );
}
```

## Usage

```yaml
plugins:
  - arrow-function

rules:
  # Plugins
  arrow-function/parens : 2
  arrow-function/no-condition : 2
  arrow-function/space  : 2
  arrow-function/return-shorthand: [2, "only-object"]
```

## Contributors

- [teppeis](https://github.com/teppeis)

## License

MIT
