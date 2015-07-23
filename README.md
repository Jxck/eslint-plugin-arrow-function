# eslint-plugin-arrow-function

custom ESLint rule, checks arrow function literal.

## Rule Details

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

## Usage

```yaml
plugins:
  - arrow-function

rules:
  # Plugins
  arrow-function/no-condition : 2
```

## Contributors

- [teppeis](https://github.com/teppeis)

## Changelog

- v1.0.0 : remove parens/spaces rules
- v0.1.0 : fix rule name from `paren` to `parens` #4
- v0.0.3 : add configuration for `space`
- v0.0.2 : add `no-condition` rule. thanks to [teppeis](https://github.com/teppeis)
- v0.0.1 : first release

## License

MIT
