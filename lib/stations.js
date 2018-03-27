'use strict'

const got = require('got')
const isNumber = require('lodash.isnumber')

const createStation = (s) => {
    const station = {
        type: 'station',
        id: s.id+'',
        name: s.name,
        weight: +s.hits,
        ibnr: s.ibnr,
        slug: s.name_slug
    }

    if (isNumber(s.longitude) && isNumber(s.latitude)) {
        station.location = {
            type: 'location',
            longitude: s.longitude,
            latitude: s.latitude
        }
        if (s.city) station.location.city = s.city
        if (s.region) station.location.region = s.region
        if (s.country) station.location.country = s.country
    } else station.location = null
    return station
}

const stations = () =>
    got.get('https://koleo.pl/api/v2/main/stations', {
        headers: {
            'X-KOLEO-Version': 1
            // 'X-KOLEO-Client': 'Android-207'
        },
        json: true
    })
    .then(res => res.body)
    .then(res => res.map(createStation))

module.exports = stations
