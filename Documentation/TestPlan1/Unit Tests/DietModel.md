# Diet Model

This feature describes the behavior of the Diet model, representing different types of diets.

## Background

Given a Sequelize connection is established
And the database is synchronized

## Scenario: Creating a new diet with valid attributes

Given a new diet with the following attributes:
  | diet_name   |
  |-------------|
  | Vegetarian  |

When the diet is created

Then the diet is successfully created with the specified attributes
And the diet's diet_name matches the given attribute

## After all scenarios

And the Sequelize connection is closed

