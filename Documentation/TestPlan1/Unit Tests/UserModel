Feature: User Model

Scenario: Check user password
Given a user with the password "password"
When the user checks the password "password"
Then the result should be true

Scenario: Check user password with incorrect password
Given a user with the password "password"
When the user checks the password "wrongpassword"
Then the result should be false

Scenario: Validate user_name length
Given a user with the user_name "a"
When the user is validated
Then a validation error should occur with message "Validation len on user_name failed"

Scenario: Validate email format
Given a user with the email "invalidemail"
When the user is validated
Then a validation error should occur with message "Validation isEmail on email failed"

Scenario: Validate password length
Given a user with the password "short"
When the user is validated
Then a validation error should occur with message "Validation len on password failed"

Scenario: Validate zip length
Given a user with the zip 1234
When the user is validated
Then a validation error should occur with message "Validation len on zip failed"

Scenario: Validate all fields with valid data
Given a user with the following data:
| user_name | email | password | zip |
| validusername | validemail@example.com| validpassword | 12345 |
When the user is validated
Then no validation errors should occur