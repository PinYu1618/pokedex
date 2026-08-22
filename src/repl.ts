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
