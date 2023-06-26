const { ff_lookup  } = require('../models');
const lookupdata = [
{
    typename: 'peanut',
    typedesc: 'allergy',
    typevalue: 'peanut'
},
{
    typename: 'soy',
    typedesc: 'allergy',
    typevalue: 'soy'
},
{
    typename: 'gluten',
    typedesc: 'allergy',
    typevalue: 'gluten'
}
]

const seedFflookup = () => ff_lookup.bulkCreate(lookupdata);

module.exports = seedFflookup;