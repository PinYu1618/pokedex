import { createInterface, type Interface } from 'readline';
import { stdin, stdout } from 'node:process';

import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

export type CLICommand = {
  name: string;
  desc: string;
  callback: (state: State) => void;
};

export interface State {
  /** readline interface */
  rl: Interface;
  /** commands registry */
  registry: Record<string, CLICommand>;
}

export function initState() {
  const registry = getCommands();
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });
  return { rl, registry } as State;
}

function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: 'exit',
      desc: 'Exit the Pokedex',
      callback: commandExit,
    },
    help: {
      name: 'help',
      desc: 'Displays a help message',
      callback: commandHelp,
    },
  };
}
