# Event Model

This feature describes the behavior of the Event model, which represents an event in the application.

## Background

Given a Sequelize connection is established
And the database is synchronized

## Scenario: Creating a new event with valid attributes

Given a new event with the following attributes:
  | first_name | last_name | user_name | email             | password    |
  |------------|-----------|-----------|-------------------|-------------|
  | John       | Doe       |           | johndoe@example.com | password123 |

When the event is created

Then the event is successfully created with the specified attributes
And the event's properties match the given attributes

## Scenario: Failing to create a new event with a duplicate event_name

Given a new event with a duplicate event_name:
  | first_name | last_name | user_name | email             | password    |
  |------------|-----------|-----------|-------------------|-------------|
  | John       | Doe       |           | johndoe@example.com | password123 |

When the event creation is attempted

Then a validation error is thrown

## Scenario: Failing to create a new event with an invalid zip code

Given a new event with an invalid zip code:
  | first_name | last_name | user_name | email             | password    |
  |------------|-----------|-----------|-------------------|-------------|
  | John       | Doe       |           | johndoe@example.com | password123 |

When the event creation is attempted

Then a validation error is thrown

## Scenario: Failing to create a new event without a host_user_id

Given a new event without a host_user_id:
  | first_name | last_name | user_name | email             | password    |
  |------------|-----------|-----------|-------------------|-------------|
  | John       | Doe       |           | johndoe@example.com | password123 |

When the event creation is attempted

Then a validation error is thrown

## After all scenarios

And the Sequelize connection is closed

