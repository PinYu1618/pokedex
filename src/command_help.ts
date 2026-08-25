import { State } from './state.js';

export async function commandHelp(state: State) {
  console.log('Welcome to the Pokedex!\nUsage:\n\n')

  Object.entries(state.registry).forEach(([k, v]) => {
    console.log(`${k}: ${v.desc}`)
  });
}
