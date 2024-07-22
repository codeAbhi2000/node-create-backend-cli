import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export function createJsTemplates(projectName) {
    const projectPath = path.join(process.cwd(), projectName);
    const srcPath = path.join(projectPath, 'src');
    const folders = [
      'controllers',
      'middlewares',
      'models',
      'routes',
      'services'
    ];
  
    try {
      // Check if project directory already exists
      if (fs.existsSync(projectPath)) {
        console.error(chalk.red(`The directory ${projectPath} already exists.`));
        process.exit(1);
      }
  
      // Create project directory
      fs.mkdirSync(projectPath);
    
    // Create src directory
    fs.mkdirSync(srcPath);
    
    // Create subdirectories in src
    folders.forEach(folder => {
      fs.mkdirSync(path.join(srcPath, folder));
    });

    fs.writeFileSync(path.join(srcPath, 'app.js'), appJsContent());
    fs.writeFileSync(path.join(projectPath, 'server.js'), serverJsContent());
    fs.writeFileSync(path.join(projectPath, '.env'), envContent());
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent());
    fs.writeFileSync(path.join(projectPath, 'package.json'), packageJsonContent(projectName));
    fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent(projectName));
    

} catch (err) {
    console.error(chalk.red(`Error creating project: ${err.message}`));
  }
}

function appJsContent() {
    return `import express from 'express';
  import bodyParser from 'body-parser';
  import cors from 'cors';
  import dotenv from 'dotenv';
  
  dotenv.config();
  
  const app = express();
  
  app.use(cors());
  app.use(bodyParser.json());
  
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
  export default app;`;
  }
  
  function serverJsContent() {
    return `import app from './src/app.js';
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
  });`;
  }

  function envContent() {
    return `PORT=5000
  DATABASE_URL=mongodb://localhost:27017/mydatabase
  SECRET_KEY=mysecretkey`;
  }

  function gitignoreContent() {
    return `node_modules
  .env
  .DS_Store
  dist`;
  }

  function packageJsonContent(projectName) {
    return `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "type": "module",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "body-parser": "^1.19.0",
      "cors": "^2.8.5",
      "dotenv": "^10.0.0",
      "express": "^4.17.1"
    },
    "devDependencies": {
      "nodemon": "^2.0.7"
    }
  }`;
  }

  function readmeContent(projectName) {
    return `# ${projectName}
  
  This is a Node.js backend project created with JavaScript.
  
  ## Installation
  
  1. Navigate to the project directory:
     \`cd ${projectName}\`
  
  2. Install dependencies:
     \`npm install\`
  
  ## Running the Project
  
  1. Start the development server:
     \`npm run dev\`
     This will start the server using nodemon, which will automatically restart the server whenever you make changes to the code.
  
  2. Start the production server:
     \`npm start\`
     This will start the server in production mode.
  
  ## Project Structure
  
  ${projectName}/
  ├── src/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── models/
  │   ├── routes/
  │   ├── services/
  |   └── app.js
  ├── .env
  ├── .gitignore
  ├── package.json
  ├── server.js
  └── README.md
  
  ## Environment Variables
  
  - **PORT**: The port number on which the server will run.
  - **DATABASE_URL**: The URL for the database connection.
  - **SECRET_KEY**: A secret key for signing tokens or other secrets.
  
  ## Happy Coding! 🚀
  `;
  }
  
  
  
