import { State } from './state.js';

export async function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on('line', async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
    } else {
      if (!state.registry[words[0]]) {
        console.log('Unknown command');
      } else {
        await state.registry[words[0]].callback(state);
      }

      state.rl.prompt();
    }
  });
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
