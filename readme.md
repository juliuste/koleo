# koleo

JavaScript client for the Polish [Koleo](https://koleo.pl/) (PKP) train API. Complies with the [friendly public transport format](https://github.com/public-transport/friendly-public-transport-format). Inofficial, using endpoints by *Koleo*. Ask them for permission before using this module in production.

[![npm version](https://img.shields.io/npm/v/koleo.svg)](https://www.npmjs.com/package/koleo)
[![Build Status](https://travis-ci.org/juliuste/koleo.svg?branch=master)](https://travis-ci.org/juliuste/koleo)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/koleo.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/koleo.svg)](https://david-dm.org/juliuste/koleo)
[![license](https://img.shields.io/github/license/juliuste/koleo.svg?style=flat)](LICENSE)
[![fptf version](https://fptf.badges.juliustens.eu/badge/juliuste/koleo)](https://fptf.badges.juliustens.eu/link/juliuste/koleo)
[![chat on gitter](https://badges.gitter.im/public-transport.svg)](https://gitter.im/public-transport)

## Installation

```shell
npm install koleo
```

## Usage

```javascript
const koleo = require('koleo')
```

This package contains data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format) and provides the following methods:

- [`stations()`](docs/stations.md) to get a list of all operated stations such as `Warszawa Centralna` or `Gdańsk Glowny`.
- [`operators()`](docs/operators.md) to get a list of all operators/brands.
- [`journeys(origin, destination, date)`](docs/journeys.md) to get routes between stations.
- [`price(journeyId)`](docs/price.md) to get pricing information for a specific journey.

## Similar Projects

- [pkp-ic](https://github.com/juliuste/pkp-ic/) - Client for the PKP Intercity API (doesn't have prices)
- [meinfernbus](https://github.com/juliuste/meinfernbus/) – Client for the Flixbus/Meinfernbus API
- [db-hafas](https://github.com/derhuerst/db-hafas/) - Client for the german railways (DB) API
- [db-prices](https://github.com/juliuste/db-prices/) - Client for the german railways (DB) price API

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/koleo/issues).
