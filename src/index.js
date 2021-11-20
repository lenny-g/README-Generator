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
const getAnswers = async (questions, loopQuestion) =>
  await inquirer.prompt(questions, loopQuestion);

const generateTitle = (title, license) => {
  const uppercaseTitle = title.toUpperCase();
  return `# ${uppercaseTitle} ![${license}](https://img.shields.io/static/v1?label=${encodeURI(
    license
  )}&message=License&color=green)
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

// loopQuestion(
//   {
//     type: "input",
//     name: "installationSteps",
//     message: "What are your steps?",
//   },
//   {
//     type: "input",
//     name: "usageSteps",
//     message: "what are you steps?",
//   },
//   {
//     type: "input",
//     name: "testSteps",
//     message: "what are your steps",
//   }
// );

const generateContributing = ({ contribute, email, github }) => {
  return `## Contributing

${contribute}

and either contact me using my email: ${email} or github account: <a href="https://github.com/${github}">${github}</a>`;
};

const generateLicense = (license) => {
  return `## License

${license} license`;
};

const generateReadme = (answers, loopAnswers) => {
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

  const { installationSteps, usageSteps, testSteps } = loopAnswers;

  return `
${generateTitle(title, license)}

${generateTableOfContents(answers)}
    
${generateDescription(description)}

${generateInstallation(installation, installationSteps)}

${generateUsage(usage, usageSteps)}
   
${generateTests(test, testSteps)}
    
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
  const answers = await inquirer.prompt(questions);
  console.log(answers);
  let installationSteps, usageSteps, testSteps;

  if (answers.installationConfirm) {
    installationSteps = await loopQuestion({
      type: "input",
      name: "installationSteps",
      message: "What are your steps?",
    });
    console.log(installationSteps);
  }
  if (answers.appConfirm) {
    usageSteps = await loopQuestion({
      type: "input",
      name: "usageSteps",
      message: "What are your steps?",
    });
    console.log(usageSteps);
  }
  if (answers.testConfirm) {
    testSteps = await loopQuestion({
      type: "input",
      name: "testSteps",
      message: "What are your steps?",
    });
    console.log(testSteps);
  }

  const allAnswers = { ...answers, installationSteps, testSteps, usageSteps };
  console.log(allAnswers);
  // generate readme based on answers
  // const readme = generateReadme(answers);
  // writeToFile("GENERATED_README.md", readme);
};
init();
