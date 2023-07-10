# Dish Model

This feature describes the behavior of the Dish model, representing a dish in the application.

## Background

Given a Sequelize connection is established
And the database is synchronized

## Scenario: Creating a new dish with valid attributes

Given a new dish with the following attributes:
  | dish_type    | dish_name           | recipe | ingredients | photo_link |
  |--------------|---------------------|--------|-------------|------------|
  | Main Course  | Spaghetti Bolognese | ...    | ...         | ...        |

When the dish is created

Then the dish is successfully created with the specified attributes
And the dish's dish_type matches the given attribute
And the dish's dish_name matches the given attribute
And the dish's recipe matches the given attribute
And the dish's ingredients matches the given attribute
And the dish's photo_link matches the given attribute

## After all scenarios

And the Sequelize connection is closed

