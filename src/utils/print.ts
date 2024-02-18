import { red, yellow } from 'chalk';

export function warn(...args: string[]) {
  console.error(yellow('[WARN]:'), ...args);
}

export function error(...args: string[]) {
  console.error(red('[ERROR]:'), ...args);
}

export default {
  warn,
  error,
};
