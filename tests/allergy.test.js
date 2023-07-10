const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Allergy = require('../models/Allergy');

describe('Allergy model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new allergy with valid attributes', async () => {
    const newAllergy = {
      allergy_product: 'Peanuts',
    };

    const createdAllergy = await Allergy.create(newAllergy);

    expect(createdAllergy.allergy_product).toBe(newAllergy.allergy_product);
  });

  // commented for the future to add more tests
//   it('should fail to create a new allergy with an empty allergy_product', async () => {
//     const newAllergy = {
//       allergy_product: '',
//     };

//     await expect(Allergy.create(newAllergy)).rejects.toThrow();
//   });

});
