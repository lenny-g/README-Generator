// import inquirer
const inquirer = require("inquirer");
const fs = require("fs");

const loopQuestion = async (question) => {
  let inProgress = true;
  const results = [];

  while (inProgress) {
    const answers = await inquirer.prompt(question);
    results.push(answers);
    const { quit } = await inquirer.prompt({
      type: "confirm",
      message: "do you want to quit?",
      name: "quit",
      default: "No",
    });

    if (quit) {
      inProgress = false;
    }
  }

  return results;
};

// inquirer prompt for confirm
// if true
// loop question
// get results
// update main answers object with key and value

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
    type: "confirm",
    name: "appConfirm",
    message: "Do you want to include an application?",
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
];

const generateTitle = (title, license) => {
  const uppercaseTitle = title.toUpperCase();
  return `# ${uppercaseTitle} ![${license}](https://img.shields.io/static/v1?label=${encodeURI(
    license
  )}&message=License&color=green)
  `;
};

const generateTableOfContents = ({
  installationSteps,
  usageSteps,
  testSteps,
}) => {
  return `## Table of Contents
- [Description](#description)
${installationSteps ? "\n- [Installation](#installation)" : ""}${
    usageSteps ? "\n- [Usage](#usage)" : ""
  }${testSteps ? "\n- [Tests](#tests)" : ""}
- [Contributing](#contributing)
- [License](#license)`;
};

const generateDescription = (description) => {
  return `## Description
${description}`;
};

const generateInstallation = (installationSteps) => {
  if (installationSteps) {
    return `## Installation
    
Run the following script to install the packages required for the application:
    
\`\`\`
${installationSteps
  .map(({ installationSteps: step }) => {
    return `${step}\n`;
  })
  .join("")}
\`\`\``;
  }
};

const generateUsage = (usageSteps) => {
  if (usageSteps) {
    return `## Usage
    
To use the application run the following script:
    
\`\`\`
${usageSteps
  .map(({ usageSteps: step }) => {
    return `${step}\n`;
  })
  .join("")}
\`\`\``;
  }
};

const generateTests = (testSteps) => {
  if (testSteps) {
    return `## Tests
    
To test this application run the following script:
    
\`\`\`
${testSteps
  .map(({ testSteps: step }) => {
    return `${step}\n`;
  })
  .join("")}
\`\`\``;
  }
};

const generateContributing = ({ contribute, email, github }) => {
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
    installationSteps,
    usageSteps,
    testSteps,
    contribute,
    email,
    github,
    license,
  } = answers;

  return `
${generateTitle(title, license)}

${generateTableOfContents(answers)}
    
${generateDescription(description)}

${generateInstallation(installationSteps)}

${generateUsage(usageSteps)}
   
${generateTests(testSteps)}
    
${generateContributing({ contribute, email, github })}
    
${generateLicense(license)}`;
};

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
};

const init = async () => {
  let installationSteps, usageSteps, testSteps;

  // prompt the question using inquirer
  const answers = await inquirer.prompt(questions);

  if (answers.installationConfirm) {
    installationSteps = await loopQuestion({
      type: "input",
      name: "installationSteps",
      message: "What are your installation steps?",
    });

    answers.installationSteps = installationSteps;
  }

  if (answers.appConfirm) {
    usageSteps = await loopQuestion({
      type: "input",
      name: "usageSteps",
      message: "What are your application's steps?",
    });

    answers.usageSteps = usageSteps;
  }

  if (answers.testConfirm) {
    testSteps = await loopQuestion({
      type: "input",
      name: "testSteps",
      message: "What are the steps to test the application?",
    });

    answers.testSteps = testSteps;
  }

  console.log(answers);
  const readme = generateReadme(answers);
  writeToFile("GENERATED_README.md", readme);
};

init();
