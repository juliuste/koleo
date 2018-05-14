'use strict'

const got = require('got')
const isNumber = require('lodash.isnumber')

const createOperator = o => ({
    type: 'operator',
    id: o.id+'',
    name: o.name,
    displayName: o.display_name,
    logoName: o.logo_text,
    color: o.color,
    carrierId: o.carrier_id
})

const operators = () =>
    got.get('https://koleo.pl/api/v2/main/brands', {
        headers: {
            'X-KOLEO-Version': 1,
            'X-KOLEO-Client': 'Node-1'
            // 'X-KOLEO-Client': 'Android-207'
        },
        json: true
    })
    .then(res => res.body)
    .then(res => res.map(createOperator))

module.exports = operators
