
# Create Node Backend CLI

A CLI tool to scaffold Node.js backend projects with options for JavaScript or TypeScript templates. The generated project includes essential packages and follows a standard structure.

## Features

- Scaffold a Node.js backend project with JavaScript or TypeScript.
- Includes essential packages such as `express`, `dotenv`, `cors`, and `body-parser`.
- Sets up a standard project structure with folders for controllers, middlewares, models, routes, and services.
- Automatically generates configuration files like `.env`, `.gitignore`, `tsconfig.json`, and `package.json`.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.0.0 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

Install the CLI globally:

```bash
npm install -g create-node-backend
```

## Usage

To create a new node-backend, run the following command:

```bash
create-node-backend your-backend-name
```

You will be prompted to choose between a JavaScript or TypeScript template. Follow the prompts to set up your project.

## Project Structure you get from the CLI

### For TypeScript project template:

```
${your-project-name}/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.ts
├── .env
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

### For JavaScript project template:

```
${your-project-name}/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Scripts

The `package.json` includes the following scripts:

- `start`: Start the production server.
- `dev`: Start the development server with auto-reload (using `nodemon` for JavaScript or `ts-node-dev` for TypeScript).
- `build`: Compile TypeScript to JavaScript (only if TypeScript is chosen).

## Environment Variables

The `.env` file contains placeholders for the following environment variables:

- **PORT**: The port number on which the server will run.
- **DATABASE_URL**: The URL for the database connection.
- **SECRET_KEY**: A secret key for signing tokens or other secrets.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.

