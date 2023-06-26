const { ff_user  } = require('../models');
const userdata = [
{
    firstname: 'Super',
    lastname: 'User',
    username: 'Admin',
    email: 'admin@admin.com',
    password: 'Admin',
    allergy_lookupid: null,
    createddate: 'January 1, 2010 00:00:00',
    changeddate: 'January 1, 2010 00:00:00'
}
]

const seedFfuser = () => ff_user.bulkCreate(userdata);

module.exports = seedFfuser;