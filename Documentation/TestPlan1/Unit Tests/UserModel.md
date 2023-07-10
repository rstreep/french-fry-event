## Feature: User model

This feature describes the behavior of the User model, representing user data and authentication.

### Background:
  Given a Sequelize connection is established
  And the database is synchronized

### Scenario: Creating a new user with valid attributes
  Given a new user with the following attributes:
  
  | first_name | last_name | user_name | email                 | password    |
  |------------|-----------|-----------|-----------------------|-------------|
  | John       | Doe       | johndoe   | johndoe1@example.com   | password123 |
  
  And there is no existing user with the same attributes
  When the user is created
  Then the user is successfully created with the specified attributes
  And the user's password is hashed

### Scenario: Failing to create a new user with an invalid user_name
  Given a new user with an invalid user_name attribute:
  
  | first_name | last_name | user_name | email             | password    |
  |------------|-----------|-----------|-------------------|-------------|
  | John       | Doe       |           | johndoe@example.com | password123 |
  
  When the user creation is attempted
  Then a validation error is thrown

### Scenario: Failing to create a new user with an invalid email
  Given a new user with an invalid email attribute:
  
  | first_name | last_name | user_name | email             | password    |
  |------------|-----------|-----------|-------------------|-------------|
  | John       | Doe       | johndoe   | invalidemail       | password123 |
  
  When the user creation is attempted
  Then a validation error is thrown

### Scenario: Failing to create a new user with a short password
  Given a new user with a short password attribute:
  
  | first_name | last_name | user_name | email                 | password |
  |------------|-----------|-----------|-----------------------|----------|
  | John       | Doe       | johndoe   | johndoe@example.com   | 123      |
  
  When the user creation is attempted
  Then a validation error is thrown

### Scenario: Failing to create a new user with a long user_name
  Given a new user with a long user_name attribute:
  
  | first_name | last_name | user_name               | email             | password    |
  |------------|-----------|-------------------------|-------------------|-------------|
  | John       | Doe       | thisusernamewillbetooolong | johndoe@example.com | password123 |
  
  When the user creation is attempted
  Then a validation error is thrown

### After all scenarios:
  And the Sequelize connection is closed

**Note:** The scenario "Creating a new user with valid attributes" includes checking if a user with the same attributes already exists and deletes it before creating the new user to ensure a clean state.
