import type { CLICommand } from './command.js';

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log('Welcome to the Pokedex!\nUsage:\n\n')

  Object.entries(commands).forEach(([k, v]) => {
    console.log(`${k}: ${v.desc}`)
  });
}
