// import inquirer
const inquirer = require("inquirer");
const fs = require("fs");
//declare questions
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "What is the description?",
  },
  {
    type: "confirm",
    name: "installationConfirm",
    message: "Do you want to include an installation script? ",
  },
  {
    when: (answers) => answers.installationConfirm,
    type: "input",
    name: "installation",
    message: "What is the installation script? ",
  },
  {
    type: "confirm",
    name: "applicationConfirm",
    message: "Do you want to include an application?",
  },
  {
    when: (answers) => answers.applicationConfirm,
    type: "input",
    name: "usage",
    message: "How do I use the application? ",
  },
  {
    type: "list",
    name: "license",
    message: "Choose a License:",
    choices: [
      { name: "MIT", value: "mit" },
      { name: "The Unlicense", value: "unlicense" },
      { name: "Mozilla Public License 2.0", value: "mozilla" },
      { name: "GNU General Public License v3.0", value: "gnu" },
    ],
  },
  {
    type: "input",
    name: "github",
    message: "What is your Github username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your Github username?",
  },
  {
    type: "input",
    name: "contribute",
    message: "How can people contribute to this application?",
  },
  {
    type: "confirm",
    name: "testConfirm",
    message: "Do you want to include a test for this application?",
  },
  {
    when: (answers) => answers.testConfirm,
    type: "input",
    name: "test",
    message: "How do I test this application?",
  },
];
const getAnswers = async (questions) => await inquirer.prompt(questions);

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
  const {
    title,
    description,
    installation,
    usage,
    test,
    contribution,
    license,
  } = answers;

  return `${generateTitle(title)}
    ${generateTableOfContents(answers)}
    ${generateDescription(description)}
    ${generateInstallation(installation)}
   ${generateUsage(usage)}
    ${generateTests(test)}
    
   ${generateContributing(contribution)}
    
  ${generateLicense(license)}
  `;
};

const writeToFile = (title, data) => {
  fs.writeFile(title, data, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
};

const init = async () => {
  // prompt the question using inquirer
  const answers = await getAnswers(questions);
  console.log(answers);
  // generate readme based on answers
  const readme = generateReadme(answers);
  writeToFile("GENERATED_README.md", readme);
};
init();
