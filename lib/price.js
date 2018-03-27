'use strict'

const got = require('got')
const isString = require('lodash.isstring')

const createTariff = t => ({
    id: t.tariff_id+'',
    name: t.tariff_name+'',
    validFrom: t.valid_from,
    validTo: t.valid_to
})

const createPrice = p => ({
    amount: +p.value,
    currency: 'PLN',
    category: p.type,
    uncertain: p.uncertain,
    season: p.season,
    returnTariff: p.return_tariff,
    documentNeeded: p.document_required,
    changesAllowed: p.changes_allowed,
    areaExtract: p.area_extract,
    validityHint: p.validity_texz || false,
    tariffs: p.validity.map(createTariff)
})

const price = async (journeyId) => {
    if (!isString(journeyId)) throw new Error('invalid or missing journey')
    const fetched = await (got.get(`https://koleo.pl/api/v2/main/connections/${journeyId}/price`, {
        headers: {
            'X-KOLEO-Version': 1
            // 'X-KOLEO-Client': 'Android-207'
        },
        json: true
    }).then(res => res.body))

    if (!fetched || Array.isArray(!fetched.prices)) return []
    return fetched.prices.map(createPrice)
}

module.exports = price
