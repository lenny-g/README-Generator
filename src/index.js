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
    name: "appConfirm",
    message: "Do you want to include an application?",
  },
  {
    when: (answers) => answers.appConfirm,
    type: "input",
    name: "usage",
    message: "How do I use the application? ",
  },
  {
    type: "list",
    name: "license",
    message: "Choose a License:",
    choices: [
      { name: "MIT", value: "MIT" },
      { name: "The Unlicense", value: "The Unlicense" },
      { name: "Mozilla Public License 2.0", value: "MPL 2.0" },
      { name: "GNU General Public License v3.0", value: "GPLv3" },
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

const generateTitle = (title, license) => {
  const uppercaseTitle = title.toUpperCase();
  return `# ${uppercaseTitle} ![${license}](https://img.shields.io/static/v1?label=${encodeURI(
    license
  )}&message=License&color=blueviolet)
  `;
};

const generateTableOfContents = ({ installation, usage, test }) => {
  return `## Table of Contents${
    installation ? "\n- [Installation](#installation)" : ""
  }${usage ? "\n- [Usage](#usage)" : ""}${test ? "\n- [Tests](#tests)" : ""}
- [Description](#description)
- [Contributing](#contributing)
- [License](#license)`;
};

const generateDescription = (description) => {
  return `## Description
${description}`;
};

const generateInstallation = (installation) => {
  if (installation) {
    return `## Installation
    
Run the following script to install the packages required for the application:
    
\`\`\`
${installation}
\`\`\``;
  }
};

const generateUsage = (usage) => {
  if (usage) {
    return `## Usage
    
To use the application run the following script:
    
\`\`\`
${usage}
\`\`\``;
  }
};

const generateTests = (test) => {
  if (test) {
    return `## Tests
    
To use this application run the following script:
    
\`\`\`
${test}
\`\`\``;
  }
};

const generateContributing = (contribute, email, github) => {
  return `## Contributing

${contribute}

and either contact me using my email: ${email} or github account: <a href="https://github.com/${github}">${github}</a>`;
};

const generateLicense = (license) => {
  return `## License

${license} license`;
};

const generateReadme = (answers) => {
  const {
    title,
    description,
    installation,
    usage,
    test,
    contribute,
    email,
    github,
    license,
  } = answers;

  return `
${generateTitle(title, license)}

${generateTableOfContents(answers)}
    
${generateDescription(description)}

${generateInstallation(installation)}

${generateUsage(usage)}
   
${generateTests(test)}
    
${generateContributing(contribute, email, github)}
    
${generateLicense(license)}`;
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
