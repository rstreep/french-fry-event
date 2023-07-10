# Project Test Plan

The test plan outlines the testing approach for the project, including models unit tests, API integration tests, and manual API tests using Insomnia.

## Test Coverage

The test plan covers the following areas:

1. Models Unit Tests: Validation of the functionality and behavior of the models in the project.
2. API Integration Tests: Validation of the integration and functionality of the project's API endpoints.
3. Manual API Tests using Insomnia: Manual testing of the API endpoints using the Insomnia REST client.
4. Test Reporting and Documentation: Documentation of test results, issues, and improvements.

## Test Cases

### 1. Models Unit Tests

**Objective:** Validate the functionality and behavior of the models in the project.

**Tools:** Jest (JavaScript testing framework).

**Test Cases:**
[Unit Tests](Documentation/TestPlan1/Unit%20Tests)
- Test the `checkPassword` method in the User model to ensure it correctly compares passwords.
- Verify the hooks in the User model to hash passwords before creating and updating users.
- Validate each model structure and attributes

**Expected Outcomes:** All models unit tests pass without errors.

### 2. API Integration Tests

**Objective:** Validate the integration and functionality of the project's API endpoints.

**Tools:** Jest, Supertest (HTTP request testing library).

**Test Cases:**
- Test each API endpoint for proper request handling and response.
- Verify authentication and authorization mechanisms.
- Validate error handling and response status codes.
- Test edge cases and input validation for various API endpoints.

**Expected Outcomes:** All API integration tests pass, and the API endpoints function correctly.

### 3. Manual API Tests using Insomnia

**Objective:** Perform manual testing of the API endpoints using the Insomnia REST client.

**Tools:** Insomnia (REST client for manual API testing).

**Test Cases:**
[Insomnia Tests](Documentation/Project2_Insomnia_APIContracts.json)
- Manually test each API endpoint using different request methods (GET, POST, PUT, DELETE) and different request payloads.
- Verify the response data and status codes for each request.
- Test API endpoints with valid and invalid data to ensure proper validation and error handling.
- Validate API functionality for user authentication and authorization.
- Test edge cases and unusual scenarios to ensure robustness of the API.

**Expected Outcomes:** All manual API tests are performed, and the API endpoints function as expected.

### 4. Test Reporting and Documentation - Future Scope

**Objective:** Document and report test results, issues, and improvements.

**Tools:** Test report templates, issue tracking tools (if applicable).

**Tasks:**
- Document test results, including models unit tests, API integration test results, and manual API test findings.
- Report any issues, bugs, or discrepancies found during testing.
- Track and prioritize issues using an issue tracking tool (if applicable).
- Provide recommendations and suggestions for improving the project's code quality and test coverage.
- Create comprehensive test documentation, including test cases, test coverage, and any necessary setup instructions.

**Expected Outcomes:** Test results and findings are documented and shared with the relevant stakeholders.

## Conclusion

Following this test plan ensures comprehensive test coverage for the project, including models unit tests, API integration tests, and manual API tests using Insomnia. The test results and findings are documented to facilitate issue tracking and improve the project's code quality and test coverage.

Feel free to customize this test plan based on your project's specific requirements and testing tools.