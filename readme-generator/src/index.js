// import inquirer
const inquirer = require("inquirer");
const fs = require("fs");
//declare questions
const questions = [];

const generateTitle = (answers) => {
  return `# TITLE ![MIT]https://img.shields.io/static/v1?label=<MIT>&message=<License>&color=<green>)`;
};

const generateTableOfContents = (answers) => {
  return `  ## Table of Contents
    
    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Tests](#tests)
    - [Contributing](#contributing)
    - [License](#license)`;
};

const generateDescription = (answers) => {
  return `## Description
    
    ADD TEXT HERE`;
};
const generateInstallation = (answers) => {
  return `## Installation
    
    Run the following script to install the packages required for the application:
    
    \`\`\`
    npm install
    
    \`\`\``;
};

const generateUsage = (answers) => {
  `## Usage
    
    To use the application run the following script:
    
    \`\`\`
    npm run start
    \`\`\``;
};
const generateTests = (answers) => {
  return `## Tests
    
    To use this application run the following script:
    
    \`\`\`
    ADD TEXT HERE
    \`\`\``;
};

const generateContributing = (answers) => {
  return `## Contributing
    
    \`\`\`
    ADD TEXT HERE
    \`\`\``;
};

const generateLicense = (answers) => {
  return `   ## License
    
    \`\`\`
    MIT
    \`\`\` `;
};

const generateReadme = (answers) => {
  return `${generateTitle(answers)}
    ${generateTableOfContents(answers)}
    ${generateDescription(answers)}
    ${generateInstallation(answers)}
   ${generateUsage(answers)}
    ${generateTests(answers)}
    
   ${generateContributing(answers)}
    
  ${generateLicense(answers)}
  `;
};

const writeToFile = (title, data) => {
  fs.writeFile(title, data, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
};

const init = async () => {
  // prompt the question using inquirer
  // generate readme based on answers
  const readme = generateReadme();
  writeToFile("GENERATED_README.md", readme);
};
init();
