#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createJsTemplates } from "../lib/jsTemplate.js";
import { createTsTemplates } from "../lib/tsTemplate.js";

async function createBackend(projectName, useTypeScript) {
  
  try {
    // Check if project directory already exists
    
    // Create boilerplate files based on the chosen language
    if (useTypeScript) {
      createTsTemplates(projectName);
    } else {
      createJsTemplates(projectName);
    }

    console.log(
      chalk.greenBright(`Project ${projectName} created successfully.`)
    );
    logReadmeContent(projectName, useTypeScript);
  } catch (err) {
    console.error(chalk.red(`Error creating project: ${err.message}`));
  }
}

function logReadmeContent(projectName, useTypeScript) {
  console.log(chalk.blueBright.bold(`\n# ${projectName}\n`));
  console.log(
    `${chalk.yellow(
      `This is a Node.js backend project created with ${
        useTypeScript ? "TypeScript" : "JavaScript"
      }.`
    )}\n`
  );
  console.log(chalk.green("## Installation\n"));
  console.log(
    chalk.white("1. ") + chalk.cyan("Navigate to the project directory:")
  );
  console.log(chalk.cyan(`   cd ${projectName}\n`));
  console.log(chalk.white("2. ") + chalk.cyan("Install dependencies:"));
  console.log(chalk.cyan("   npm install\n"));
  console.log(chalk.green("## Running the Project\n"));
  console.log(chalk.white("1. ") + chalk.cyan("Start the development server:"));
  console.log(chalk.cyan("   npm run dev\n"));
  console.log(
    chalk.cyan(
      `   This will start the server using ${
        useTypeScript ? "tsc --watch mode and concurrently" : "nodemon"
      }, which will automatically restart the server whenever you make changes to the code.\n`
    )
  );
  console.log(chalk.white("2. ") + chalk.cyan("Start the production server:"));
  console.log(chalk.cyan("   npm start\n"));
  console.log(
    chalk.cyan("   This will start the server in production mode.\n")
  );
  if (useTypeScript) {
    console.log(chalk.white("3. ") + chalk.cyan("Build the project:"));
    console.log(chalk.cyan("   npm run build\n"));
  }
  console.log(chalk.green("## Project Structure\n"));
  console.log(
    chalk.cyan(`${projectName}/\n`) +
      chalk.cyan(`├── src/\n`) +
      chalk.cyan(`│   ├── controllers/\n`) +
      chalk.cyan(`│   ├── middlewares/\n`) +
      chalk.cyan(`│   ├── models/\n`) +
      chalk.cyan(`│   ├── routes/\n`) +
      chalk.cyan(`│   |── services/\n`) +
      chalk.cyan(`│   └── ${useTypeScript ? "server.ts" : "app.js"}\n`) +
      chalk.cyan(`├── .env\n`) +
      chalk.cyan(`├── .gitignore\n`) +
      chalk.cyan(`├── package.json\n`) +
      (useTypeScript ? chalk.cyan("├── nodemon.json\n") : "") +
      (useTypeScript ? chalk.cyan("├── tsconfig.json\n") : "") +
      (!useTypeScript ? chalk.cyan(`├── server.js\n`) : "") +
      chalk.cyan(`└── README.md\n`)
  );
  console.log(chalk.green("## Environment Variables\n"));
  console.log(
    chalk.cyan("- ") +
      chalk.white("**PORT**: The port number on which the server will run.")
  );
  console.log(
    chalk.cyan("- ") +
      chalk.white("**DATABASE_URL**: The URL for the database connection.")
  );
  console.log(
    chalk.cyan("- ") +
      chalk.white(
        "**SECRET_KEY**: A secret key for signing tokens or other secrets.\n"
      )
  );
  console.log(chalk.magentaBright("🚀 Happy coding! 🚀"));
}

async function main() {
  const args = process.argv.slice(2);
  const projectName = args[0];

  if (!projectName) {
    console.error(chalk.red("You must provide a project name."));
    console.error(chalk.yellow("Usage: create-backend <project-name>"));
    process.exit(1);
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose the language for your project:",
      choices: ["TypeScript", "JavaScript"],
      default: "JavaScript",
    },
  ]);

  const useTypeScript = answers.language === "TypeScript";
  createBackend(projectName, useTypeScript);
}

main();
