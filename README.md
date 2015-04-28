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
