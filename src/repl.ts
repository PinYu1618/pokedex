import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

import type { CLICommand } from './command.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

export function startREPL() {
  const registry = getCommands();
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', (line) => {
    const words = cleanInput(line);
    
    if (words.length === 0) {
      rl.prompt();
    } else {
      if (!registry[words[0]]) {
        console.log('Unknown command');
      } else {
        registry[words[0]].callback(registry)
      }

      rl.prompt();
    }
  });
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: 'exit',
      desc: 'Exit the Pokedex',
      callback: commandExit,
    },
    help: {
      name: 'help',
      desc: 'Displays a help message',
      callback: commandHelp
    }
  };
}

/*
  The purpose of this function will be to split the 
  user's input into "words" based on whitespace. It 
  should also lowercase the input and trim any leading 
  or trailing whitespace.
*/
export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(/\s+/)
    .filter((e) => e.length > 0)
    .map((s) => s.toLowerCase());
}
