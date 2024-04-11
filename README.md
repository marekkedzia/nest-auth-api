# NestJS Authentication API

## Features

- **Registration**: Users can register by providing an email and password, along with additional personal information such as first name, last name, phone number, shirt size, and preferred technology.
- **Login**: Authentication is performed using email and password.
- **`/users` Endpoint**: Returns a list of all users, accessible only to logged-in users.

## Libraries and Tools

- **TypeORM**: The chosen ORM for managing the SQLite database.
- **ts-opaque**: Added the `ts-opaque` library to create opaque types, enhancing application security by preventing the accidental assignment of values to types that should be independent, such as `Email` or `Password`.

## Testing

Unit tests have been written to ensure the functionality works as expected and to maintain code quality. Additionally, an extensive Postman collection has been prepared for testing API contracts.
- **Link to Postman Collection**: [NestJS Authentication API](https://www.postman.com/speeding-resonance-274689/workspace/sello/collection/24032243-fc36c53d-03ca-4d14-963e-f9d1829d2604?action=share&source=copy-link&creator=24032243&active-environment=34104c79-1870-4349-a603-53d5735930e1)
## Project Setup

To run the project, follow these steps:

1. Clone the repository.
2. Run `yarn install` in the project directory to install dependencies.
3. Run `yarn start` to start the application.
4. Use Postman or another API testing tool to test the application's functionalities.
