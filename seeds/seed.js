const sequelize = require('../config/connection');
const { ff_event_guest_map, ff_event, ff_lookup, ff_menu, ff_user} = require('../models');

const userData = require('./user.json');


const seedDatabase = async () => {
  try {
    // Seed users
    const users = await ff_user.bulkCreate(userData, { individualHooks: true, returning: true });
    // ToDo - add seeds for other tables
    

    // TODO - add associations for other tables
        console.log('Database seeded successfully.');

  } catch (error) {
    console.error('Error seeding database:', error);
  }

  // Exit the process
  process.exit(0);
};

seedDatabase();
