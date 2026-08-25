/*
  Use .js extensions when importing files. We're 
  using a bare-bones setup without a bundler, 
  so Node can't import .ts
 */

// repl.js actually refers to repl.ts
import { startREPL } from './repl.js';
import { initState } from './state.js';

async function main() {
  const state = initState();
  await startREPL(state);
}

main();
