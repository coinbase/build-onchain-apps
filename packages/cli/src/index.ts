#! /usr/bin/env node
import { Command } from "commander"; // add this line
import { textSync } from 'figlet';

const program = new Command();

program
  .version("0.0.1")
  .description("An example hello world CLI")
  .option("-l, --ls  [value]", "List directory contents")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

console.log(textSync("Build Onchain"));