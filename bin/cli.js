#!/usr/bin/env node
const fs = require("fs-extra");
const chalk = require("chalk");
const prompts = require("prompts");
const path = require("path");
async function init() {
  console.log(chalk.yellow("\n🚀 Welcome to the React-Go Bundler!\n"));
  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: "What is your project name?",
    initial: "my-react-go-app",
  });
  if (!projectName) {
    console.log(chalk.yellow("\nOperation cancelled. Bye! 👋"));
    return;
  }
  const normalizedName = projectName.trim();
  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, normalizedName);
  const relativeTarget = path.relative(cwd, targetDir);
  if (
    !relativeTarget ||
    relativeTarget.startsWith("..") ||
    path.isAbsolute(relativeTarget)
  ) {
    console.error(
      chalk.red(
        "\nInvalid project name. Please choose a subdirectory inside the current folder.",
      ),
    );
    process.exitCode = 1;
    return;
  }
  const templateDir = path.join(__dirname, "../templates");
  try {
    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: `Target directory "${projectName}" is not empty. Do you want to overwrite?`,
        initial: false,
      });
      if (!overwrite) {
        console.log(chalk.red("\n✖") + " Operation cancelled.");
        return;
      }
      console.log(chalk.gray(`\nCleaning ${projectName}...`));
      await fs.emptyDir(targetDir);
    }
    console.log(chalk.yellow(`\nCreating project in ${targetDir}...`));

    await fs.ensureDir(targetDir);
    await fs.copy(templateDir, targetDir);
    const cdPath = projectName === "." ? "" : `cd ${projectName} && `;
    console.log(chalk.green(`\n✅ Success! Project created at ${targetDir}`));
    console.log(chalk.white(`\nNext steps to get started:`));

    console.log(chalk.cyan(`\n  Step 1: Setup Frontend`));
    console.log(chalk.white(`${cdPath}cd frontend && npm install`));

    console.log(chalk.cyan(`\n  Step 2: Setup Backend`));
    console.log(chalk.white(`    ${cdPath}cd backend && go mod tidy`));

    console.log(chalk.cyan(`\n  Step 3: Run the project`));

    console.log(chalk.white(`    # In backend:  go run main.go\n`));
    console.log(chalk.white(`    # In frontend: npm run dev`));
  } catch (err) {
    console.error(chalk.red("\nSomething went wrong:"), err);
  }
}

init();
