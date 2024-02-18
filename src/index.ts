#!/usr/bin/env node
import * as chalk from 'chalk';
import { Command } from 'commander';
import { textSync } from 'figlet';
import { createProject } from './commands/create';
import { doctor } from './commands/doctor';

const program = new Command();

program.command('create').description('Create a new App').action(createProject);

program.command('doctor').description('Verify .env setup').action(doctor);

program.parse(process.argv);

console.log(
  chalk.blueBright(textSync('Build Onchain', { horizontalLayout: 'full' }))
);
