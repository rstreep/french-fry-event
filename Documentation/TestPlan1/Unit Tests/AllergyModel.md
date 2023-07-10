# Allergy Model

This feature describes the behavior of the Allergy model, representing different types of allergies.

## Background

Given a Sequelize connection is established
And the database is synchronized

## Scenario: Creating a new allergy with valid attributes

Given a new allergy with the following attributes:
  | allergy_product |
  |-----------------|
  | Peanuts         |

When the allergy is created

Then the allergy is successfully created with the specified attributes
And the allergy's allergy_product matches the given attribute

## After all scenarios

And the Sequelize connection is closed

