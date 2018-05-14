'use strict'

const got = require('got')
const isString = require('lodash.isstring')
const isDate = require('lodash.isdate')
const isObject = require('lodash.isobject')
const moment = require('moment')

const createStopover = s => ({
    passed: s.in_path,
    station: s.station_id+'',
    arrival: s.arrival,
    departure: s.departure,
    distanceFromLast: s.distance,
    platform: s.platform,
    track: s.track,
    entryOnly: s.entry_only,
    exitOnly: s.exit_only,
})

const createLeg = l => ({
    origin: l.start_station_id+'',
    destination: l.end_station_id+'',
    departure: l.departure,
    arrival: l.arrival,
    schedule: l.id+'',
    line: {
        type: 'line',
        id: l.train_id+'',
        number: l.train_number || null,
        name: l.train_name,
        mode: 'train', // todo
        operator: l.brand_id+'',
        hint: l.run_desc,
        attributes: (l.train_attribute_ids || [])
    },
    mode: 'train', // todo
    operator: l.brand_id+'',
    stopovers: l.stops.map(createStopover)
    // todo: carriages, bookable
})

const createJourney = j => ({
    type: 'journey',
    id: j.id+'',
    legs: j.trains.map(createLeg),
    distance: j.distance || null,
    tariff: {
        // bookable: j.bookable,
        documentNeeded: j.needs_document,
        purchasable: j.purchasable,
        purchasableErrors: (j.purchasable_errors || [])
    }
})

const journeys = async (origin, destination, date = new Date()) => {
    if (!isObject(origin)) throw new Error('origin must be a station object')
    if (!isObject(destination)) throw new Error('destination must be a station object')

    if (!isString(origin.id)) throw new Error('invalid or missing origin id')
    if (!isString(origin.slug)) throw new Error('invalid or missing origin slug')
    if (origin.type !== 'station') throw new Error('invalid or missing origin type: must be station')
    if (!isString(destination.id)) throw new Error('invalid or missing destination id')
    if (!isString(destination.slug)) throw new Error('invalid or missing destination slug')
    if (destination.type !== 'station') throw new Error('invalid or missing destination type: must be station')

    origin = origin.slug
    destination = destination.slug

    if (!isDate(date)) throw new Error('date must be a JS date object')
    const dateString = moment(date).format("DD-MM-YYYYTHH:mm:ss")

    const fetched = await (got.get('https://koleo.pl/api/v2/main/connections', {
        headers: {
            'X-KOLEO-Version': 1,
            'X-KOLEO-Client': 'Node-1'
            // 'X-KOLEO-Client': 'Android-207'
        },
        query: {
            'query[start_station]': origin,
            'query[end_station]': destination,
            'query[date]': dateString
        },
        json: true
    }).then(res => res.body))

    if (!fetched || Array.isArray(!fetched.connections)) return []
    return fetched.connections.map(createJourney)
}

module.exports = journeys
