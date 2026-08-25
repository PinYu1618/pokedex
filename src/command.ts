export type CLICommand = {
  name: string;
  desc: string;
  callback: (commands: Record<string, CLICommand>) => void;
};
