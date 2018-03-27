# `stations()`

Get all operated stations such as `Warszawa Centralna` or `Gdańsk Glowny`. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `station`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
const koleo = require('koleo')
koleo.stations()
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        type: "station",
        id: "30874",
        name: "Gębarzewo",
        weight: 0,
        ibnr: 7129,
        slug: "gebarzewo",
        location: null
    },
    {
        type: "station",
        id: "79467",
        name: "Miechów",
        weight: 2755,
        ibnr: 3173,
        slug: "miechow",
        location: {
            type: "location",
            longitude: 20.0109497891016,
            latitude: 50.3540770261221
        }
    }
    // …
]
```
