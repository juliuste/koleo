# `journeys(origin, destination, date = new Date())`

Get directions for routes from A to B. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve with an array of `journey`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

`origin` and `destination` must be `station` objects containing `id` and `slug` attributes (use the [`stations`](stations.md) method to get this information).

`date` must be a JS `Date` object.

```js
const warszawa = {
	type: 'station',
	id: '33605',
	slug: 'warszawa-centralna'
}

const wroclaw = {
	type: 'station',
	id: '60103',
	slug: 'wroclaw-glowny'
}

const koleo = require('koleo')
koleo.journeys(wroclaw, warszawa, new Date())
.then(console.log)
.catch(console.error)
```

## Response

```js
[
	{
	    type: "journey",
	    id: "226587847",
	    legs: [
	        {
	            origin: "60103",
	            destination: "30601",
	            departure: "2018-04-06T09:43:00.000+02:00",
	            arrival: "2018-04-06T12:00:00.000+02:00",
	            schedule: "460151754",
	            line: {
	                type: "line",
	                id: "23745543",
	                number: null,
	                name: "BARNIM",
	                mode: "train",
	                operator: "28",
	                hint: null,
	                attributes: [1, 32, 7, 57, 10, 11, 4]
	            },
	            mode: "train",
	            operator: "28",
	            stopovers: [
	                {
	                    passed: false,
	                    station: "73312",
	                    arrival: "2018-04-06T07:11:00.000+02:00",
	                    departure: "2018-04-06T07:11:00.000+02:00",
	                    distanceFromLast: 0,
	                    platform: "II",
	                    track: null,
	                    entryOnly: false,
	                    exitOnly: false
	                },
	                {
	                    passed: false,
	                    station: "69823",
	                    arrival: "2018-04-06T07:26:00.000+02:00",
	                    departure: "2018-04-06T07:27:00.000+02:00",
	                    distanceFromLast: 18545,
	                    platform: "I",
	                    track: null,
	                    entryOnly: false,
	                    exitOnly: false
	                }
	                // …
	            ]
	        }
	        // …
	    ],
	    distance: 508,
	    tariff: {
	        documentNeeded: false,
	        purchasable: false,
	        purchasableErrors: [
	            {
	                type: "non_purchasable_carriers",
	                value: "nie sprzedajemy jeszcze biletów tego przewoźnika."
	            }
	        ]
	    }
	}
	// …
]
```
