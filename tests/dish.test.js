const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Dish = require('../models/Dish');

describe('Dish model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new dish with valid attributes', async () => {
    const newDish = {
      dish_type: 'Main Course',
      dish_name: 'Spaghetti Bolognese',
      recipe: '...',
      ingredients: '...',
      photo_link: '...',
    };

    const createdDish = await Dish.create(newDish);

    expect(createdDish.dish_type).toBe(newDish.dish_type);
    expect(createdDish.dish_name).toBe(newDish.dish_name);
    expect(createdDish.recipe).toBe(newDish.recipe);
    expect(createdDish.ingredients).toBe(newDish.ingredients);
    expect(createdDish.photo_link).toBe(newDish.photo_link);
  });

});
