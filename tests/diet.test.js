const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Diet = require('../models/Diet');

describe('Diet model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new diet with valid attributes', async () => {
    const newDiet = {
      diet_name: 'Vegetarian',
    };

    const createdDiet = await Diet.create(newDiet);

    expect(createdDiet.diet_name).toBe(newDiet.diet_name);
  });
});
