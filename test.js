'use strict'

const tape = require('tape')
const validate = require('validate-fptf')
const moment = require('moment')
const koleo = require('./index')

tape('koleo.stations', t => {
	koleo.stations().then(s => {
		t.ok(s.length > 30, 'stations length')

		for (let station of s) validate(station)

		const katowice = s.find(x => x.slug === 'katowice')
		t.ok(katowice.location.longitude > 10 && katowice.location.longitude < 20, 'katowice longitude')
		t.ok(katowice.location.latitude > 45 && katowice.location.latitude < 55, 'katowice latitude')
		t.ok(Number.isInteger(katowice.ibnr) && katowice.ibnr > 0, 'katowice ibnr')
		t.ok(Number.isInteger(katowice.weight) && katowice.weight > 500, 'katowice weight')
		t.end()
	}).catch(t.ifError)
})

tape('koleo.operators', t => {
	koleo.operators().then(o => {
		t.ok(o.length > 10, 'operators length')

		for (let operator of o) {
			validate(operator)
			t.ok(operator.color.length === 7, 'color')
			t.ok(operator.displayName, 'displayName')
			t.ok(operator.logoName, 'displayName')
			t.ok(Number.isInteger(operator.carrierId), 'carrierId')
		}

		t.end()
	}).catch(t.ifError)
})

const wroclaw = {
	type: 'station',
	id: '60103',
	slug: 'wroclaw-glowny'
}

const warszawa = {
	type: 'station',
	id: '33605',
	slug: 'warszawa-centralna'
}

const when = moment().add(10, 'day').startOf('day').add(10, 'hour').toDate()

const isStopover = s =>
	s.arrival
&&	s.departure
&&	+new Date(s.arrival) <= +new Date(s.departure)
&&	Number.isInteger(s.distanceFromLast) && s.distanceFromLast >= 0
&&	(validate(s.station) ? true : true)

tape('koleo.journeys', t => {
	koleo.journeys(wroclaw, warszawa, when).then(j => {
		t.ok(j.length > 1, 'journeys length')

		for (let journey of j) validate(journey)

		const [journey] = j
		t.ok(journey.legs[0].origin === wroclaw.id, 'origin')
		t.ok(journey.legs[journey.legs.length-1].destination === warszawa.id, 'destination')
		t.ok(journey.legs.every(l => l.mode === 'train'), 'leg mode')
		t.ok(journey.legs.every(l => l.operator), 'leg operator')
		t.ok(journey.legs.every(l => l.line.id && (l.line.number || l.line.name) && l.line.operator && l.line.mode === 'train'), 'leg line')
		t.ok(journey.legs.every(l => l.stopovers.every(isStopover)), 'leg stopovers')

		t.ok(journey.distance > 0, 'distance')

		t.end()
	}).catch(t.ifError)
})

const isTariff = t =>
	t.id
&&	t.name
&&	t.validFrom
&&	t.validTo

tape('koleo.price', async (t) => {
	const journeys = await koleo.journeys(warszawa, wroclaw, when)
	for (let j of journeys) {
		const prices = await koleo.price(j.id)
		for (let p of prices) {
			t.ok(p.amount > 0, 'amount')
			t.ok(p.currency === 'PLN', 'currency')
			t.ok(p.category, 'category')
			t.ok(p.tariffs.every(isTariff), 'tariffs')
		}
	}
	t.end()
})
