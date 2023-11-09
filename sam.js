#!usr/bin/env node

import path from 'path';
import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { spawn } from 'child_process';
import { exec } from 'child_process';



var instal_conf={
    name: "sam"
};
var x = {
    yarn: "yarn",
    npm: "npx",
    pnpm: "pnpx",
}


function main(){
    const answers = inquirer.prompt([
        {
            name: "name",
            type: "text",
            message: "Name your project",
            default(){
                return "sam-project"
            }
        },
        {
            name: "pm",
            type: "list",
            message: "which package manager would you like to use",
            choices: [
                "npm",
                "yarn",
                "pnpm",
            ],
            default(){
                return "npm"
            }
        },
        {
            name: "options",
            type: "checkbox",
            message: "What framework would you like to use in this porject",
            choices: [
                "TypeScript",
                "Astro",
                "Docker",
                "Kafka",
                "GraphQL",
                "Redis",
            ],
        },
        {
            name: "testing",
            type: "list",
            message: "select testing framework",
            choices: [
                "none",
                "MochaJS",
                "Jest",
                "Jasmine",
                "Karma",
                "Puppeteer",
                "NightwatchJS",
                "Cypress",
            ],
            default(){
                return "none"
            }
        },
        {
            name: "fe_frameowork",
            type: "list",
            message: "which front-end framework would you like to use",
            choices: [
                "Svelte",
                "Vue",
                "React",
            ],
            default(){
                return "Svelte"
            }
        },
        {
            name: "svelte_template",
            type: "list",
            message: "which Svelte app template?",
            choices: [
                "SvelteKit",
                "Skeleton project",
                "Library project",
            ],
        },
        {
            name: "additional_options",
            type: "checkbox",
            message: "select additional options",
            choices: [
                "ESLint",
                "Prettier",
                "Playwright",
                "Vitest",
            ],
        },
        {
            name: "css_options",
            type: "checkbox",
            message: "css options",
            choices: [
                "tailwind",
                "storybook",
                "storyblok",
            ],
        },
        {
            name: "integrations",
            type: "checkbox",
            message: "select integrations you want to make",
            choices: [
                "google tag manager",
                "stripe",
                "twilio",
                "algolia",
                "mailchip",
                "postmanAPI",
            ],
        },
    ])


    instal_conf = answers.options;
    /*
    > what would you like to call your project?
    > select options:
    > select testing framework:
    > which package manager would you like to use
    > which front-end framework would you like to use
    > which Svelte app template? (if svlete)
    > select additional options (use arrow keys/space bar) (anything that appears as plugin in any framework installation)
    > Css options
    > select integrations you want to make:
    */
}

function download(){
    create_dir()
    install_pm(instal_conf.pm)
    instal_nest()

    process.chdir(`..`)
}

function create_dir(){
    if(!fs.exists()){
        fs.mkdirSync(instal_conf.name)
    }
    process.chdir(`./${instal_conf.name}`)
}
function install_pm(pm){
    exec(`npm --version`, (error, stdout, stderr) => {
        if(Boolean(error)){
            throw new Error("Node is not installed!")
        }else{
            exec(`${pm} --version`, (error, stdout, stderr) => {
                if(Boolean(error)){
                    execSync(`npm install -g ${pm}`)
                }
            });
        }
    });
}
function setup_nest() {
    let setting_spinner = createSpinner('Setting up Nest...');
    setting_spinner.start();

    const projectPath = path.join(process.cwd(), instal_conf.name);
    fs.mkdirSync(projectPath);

    const command = `npx @nestjs/cli new ${instal_conf.name} --skip-install --package-manager=npm`;

    exec(command, { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating NestJS project: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error creating NestJS project: ${stderr}`);
        return;
      }
      setting_spinner.stop();
      console.log('Nest sat up successfully!');

    });
}

function instal_nest(){
    var command = x[instal_conf.pm];
    var args = ['create-nx-workspace@latest', instal_conf.name, '--preset=nest', '--nx-cloud=false', '--defaultBase=main','-y'];

    var child = spawn(command, args);

    child.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    child.stdin.write('Y\n');

    child.on('exit', (code) => {
        if (code === 0) {
            console.log('Nest downloaded successfully');
        } else {
            console.error(`Nest download with code ${code}`);
        }
    });

    child.stdin.end();
}

await setup_nest();
// await download();
