# `price(journeyId)`

Get pricing information for a specific `journey` id. (Get those `id`s using the [`journeys`](journeys.md) method.) Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of price objects (mostly just containing one element) like this:

```js
const koleo = require('koleo')
koleo.price('226552184')
.then(console.log)
.catch(console.error)
```

## Response

```js
[
    {
        amount 65,
        currency "PLN",
        category "main",
        uncertain false,
        season false,
        returnTariff false,
        documentNeeded true,
        changesAllowed false,
        areaExtract null,
        validityHint false,
        tariffs [
            {
                id "156",
                name "Cena Bazowa",
                validFrom "2018-04-27T18:25:00.000+02:00",
                validTo "2018-04-27T23:26:00.000+02:00"
            }
        ]
    }
    // …
]
```
