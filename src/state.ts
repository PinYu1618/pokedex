import { createInterface, type Interface } from 'readline';
import { stdin, stdout } from 'node:process';

import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMapForward, commandMapBack } from './command_map.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
  name: string;
  desc: string;
  callback: (state: State) => Promise<void>;
};

export interface State {
  /** readline interface */
  rl: Interface;
  /** commands registry */
  registry: Record<string, CLICommand>;
  /** Poke API */
  api: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
}

export function initState() {
  const registry = getCommands();
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });
  const api = new PokeAPI();
  return {
    rl,
    registry,
    api,
    nextLocationsURL: '',
    prevLocationsURL: '',
  } as State;
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
    map: {
      name: 'map',
      desc: 'Get the next page of locations',
      callback: commandMapForward,
    },
    mapb: {
      name: 'mapb',
      desc: 'Get the previous page of locations',
      callback: commandMapBack,
    },
  };
}
