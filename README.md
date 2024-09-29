# Session Cookies Example

This is a simple example of using session cookies with Express.js.

## How to Run

1. Clone the repository.
2. Run `yarn install` to install dependencies.
3. Start the server with `yarn start`.
4. Access the application at `http://localhost:3000`.

## Endpoints

- **GET /**: Welcome message.
- **POST /set-session**: Set a session variable. Send JSON with `{ "user": "your-username" }`.
- **GET /get-session**: Retrieve the session variable.
