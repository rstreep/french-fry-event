const { Model, DataTypes,ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const User = require('../models/User');


// class MockUser extends Model {}
// MockUser.init(
//   {
//     user_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     first_name: {
//       type: DataTypes.STRING,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//     },
//     user_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1, 15],
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [6],
//       },
//     },
//     street_address: {
//       type: DataTypes.STRING,
//     },
//     city: {
//       type: DataTypes.STRING,
//     },
//     state: {
//       type: DataTypes.STRING,
//     },
//     zip: {
//       type: DataTypes.INTEGER,
//       validate: {
//         len: [5],
//       },
//     },
//     created_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     changed_date: {
//       type: DataTypes.DATE,
//     },
//   },
//   { sequelize, modelName: 'user' }
// );

// User.init(MockUser.init({}, { sequelize }));

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('User model', () => {
  it('should create a new user with valid attributes', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      user_name: 'johndoe',
      email: 'johndoe1@example.com',
      password: 'password123',
    };

    const foundUser = await User.findOne({
        where: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          user_name: newUser.user_name,
          email: newUser.email,
        },
      });

    if (foundUser) {
        await foundUser.destroy();
      }

    const createdUser = await User.create(newUser);

    expect(createdUser.first_name).toBe(newUser.first_name);
    expect(createdUser.last_name).toBe(newUser.last_name);
    expect(createdUser.user_name).toBe(newUser.user_name);
    expect(createdUser.email).toBe(newUser.email);
    expect(createdUser.password).not.toBe(newUser.password);
    
  });

  it('should fail to create a new user with an invalid user_name', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      user_name: '', // Invalid: Empty string
      email: 'johndoe@example.com',
      password: 'password123',
    };

    await expect(User.create(newUser)).rejects.toThrow(ValidationError);
  });

  it('should fail to create a new user with an invalid email', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      user_name: 'johndoe',
      email: 'invalidemail', // Invalid: Not a valid email address
      password: 'password123',
    };

    await expect(User.create(newUser)).rejects.toThrow(ValidationError);
  });

  it('should fail to create a new user with a short password', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      user_name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123', // Invalid: Less than 6 characters
    };

    await expect(User.create(newUser)).rejects.toThrow(ValidationError);
  });

  it('should fail to create a new user with a long user_name', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      user_name: 'thisusernamewillbetooolong', // Invalid: More than 15 characters
      email: 'johndoe@example.com',
      password: 'password123',
    };

    await expect(User.create(newUser)).rejects.toThrow(ValidationError);
  });
});
