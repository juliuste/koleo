# `operators()`

Get all operators/brands. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `operators`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const koleo = require('koleo')
koleo.operators()
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        type: "operator",
        id: "13",
        name: "LKA",
        displayName: "ŁKA",
        logoName: "ŁKA",
        color: "#ADB3B3",
        carrierId: 9
    }
    // …
]
```
