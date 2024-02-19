#!/usr/bin/env node
import * as color from 'picocolors';
import { Command } from 'commander';
import { textSync } from 'figlet';
import { createProject } from './create';

const program = new Command();

program.command('create').description('Create a new App').action(createProject);

program.parse(process.argv);

console.log(color.blue(textSync('Build Onchain', { horizontalLayout: 'full' })));
