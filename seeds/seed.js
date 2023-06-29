const sequelize = require('../config/connection');
const { Allergy, UserAllergy, Diet, UserDiet, User, Event, Guest, Dish, Menu } = require('../models');

const userData = require('./user.json');
const allergyData = require('./allergy.json');
const dietData = require('./diet.json');
const eventData = require('./event.json');
const dishData = require('./dish.json');

// Function to seed the Event model
const seedEvents = async (users) => {
  try {
    const eventsWithHosts = eventData.map(event => ({
      ...event,
      host_user_id: users[Math.floor(Math.random() * users.length)].user_id
    }));

    // Bulk create events
    await Event.bulkCreate(eventsWithHosts, { individualHooks: true, returning: true });
    console.log('Event seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding events:', error);
  }
};

// Function to seed the Allergy model
const seedAllergies = async () => {
  try {
    // Bulk create allergies

    const allergies = await Allergy.bulkCreate(allergyData, { individualHooks: true, returning: true });
    console.log('Allergies seed data inserted successfully.');
    return allergies;
  } catch (error) {
    console.error('Error seeding allergies:', error);
    return error;
  }
  //return allergies;
};
// Function to seed the Diet model
const seedDiets= async () => {
  try {
    // Seed diets
    const diets = await Diet.bulkCreate(dietData, { individualHooks: true, returning: true });
    console.log('Diet seed data inserted successfully.');
    return diets;
  } catch (error) {
    console.error('Error seeding diets:', error);
    return error;
  }
};
// Function to seed the User model
const seedUsers= async () => {
  try {
    // Seed users
    const users = await User.bulkCreate(userData, { individualHooks: true, returning: true });
    console.log('User seed data inserted successfully.');
    return users;
  } catch (error) {
    console.error('Error seeding users:', error);
    return error;
  }
};

// Seed UserAllergy associations
const seedUserAllergies = async (users, allergies) => {
  try {
    const userAllergyData = [];
    for (const user of users) {
      const userId = user.user_id;
      const numAllergies = Math.floor(Math.random() * allergies.length) + 1;
      for (let i = 0; i < numAllergies; i++) {
        const allergyId = allergies[Math.floor(Math.random() * allergies.length)].allergy_id;
        userAllergyData.push({ user_id: userId, allergy_id: allergyId });
      }
    }
    // Bulk create UserAllergy associations
    await UserAllergy.bulkCreate(userAllergyData, { individualHooks: true, returning: true });
    console.log('UserAllergy associations seeded successfully.');
  } catch (error) {
    console.error('Error seeding UserAllergy associations:', error);
  }
};
// Seed UserDiet associations
const seedUserDiets = async (users, diets) => {
  try {
    const userDietData = [];
    for (const user of users) {
      const userId = user.user_id;
      const numDiets = Math.floor(Math.random() * diets.length) + 1;
      for (let i = 0; i < numDiets; i++) {
        const dietId = diets[Math.floor(Math.random() * diets.length)].diet_id;
        userDietData.push({ user_id: userId, diet_id: dietId });
      }
    }

    // Bulk create UserDiet associations
    await UserDiet.bulkCreate(userDietData, { individualHooks: true, returning: true });
    console.log('UserDiet associations seeded successfully.');
  } catch (error) {
    console.error('Error seeding UserDiet associations:', error);
  }
};
  // Seed Guest associations
const seedGuests = async (users, events) => {
  try {
    // Generate random guest associations
    const guestData = [];
    for (const user of users) {
      const userId = user.user_id;
      const numEvents = Math.floor(Math.random() * events.length) + 1;
      for (let i = 0; i < numEvents; i++) {
        const eventId = events[Math.floor(Math.random() * events.length)].event_id;
        guestData.push({ user_id: userId, event_id: eventId });
      }
    }

    // Seed guest associations
    await Guest.bulkCreate(guestData, { individualHooks: true, returning: true });

    console.log('Guest associations seeded successfully.');
  } catch (err) {
    console.error('Error seeding guest associations:', err);
  }
};

// Function to seed the Dish model
const seedDishes = async () => {
  try {
    // Bulk create dishes
    const dishes = await Dish.bulkCreate(dishData, { individualHooks: true, returning: true });
    console.log('Dish seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding dishes:', error);
  }
  //return dishes;
};

// Async function to seed Menu table
const seedMenu = async (events, dishes) => {
  try {
    // Array to store menu associations
    const menuData = [];
    // Loop through events
    for (const event of events) {
      const eventId = event.event_id;  
      // Randomly select a dish ID
      const dishId = dishes[Math.floor(Math.random() * dishes.length)].dish_id;
      // Create menu association
      menuData.push({ dish_id: dishId, event_id: eventId });
    }
    // Seed Menu associations
    await Menu.bulkCreate(menuData);
    console.log('Menu seeding successful!');
  } catch (error) {
    console.error('Menu seeding failed:', error);
  }
};
// Seed the database
const seedDatabase = async () => {
  try {

    const allergies  = await seedAllergies();
    const diets = await seedDiets();
    const users = await seedUsers();
    const userAllergies = await seedUserAllergies(users, allergies);
    const userDiets = await seedUserDiets(users, diets);
    const events = await seedEvents(users);
    //const guests = await seedGuests(users, events);
    const dishes = await seedDishes();
    //const menu = await seedMenu(events, dishes);

    console.log('Database seeded successfully.');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
  // Exit the process
  process.exit(0);
};

seedDatabase();
