import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

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

export function startREPL() {
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
      console.log(`Your command was: ${words[0]}`);
      rl.prompt();
    }
  });
}
