import { fileLogSync } from './fileLog';

export const uncaughtExceptionHandler = (err: Error) => {
  const logStr = `${err.message} at ${new Date().toLocaleTimeString()}\n`;

  process.stdout.write(logStr);
  fileLogSync('uncaught', logStr);

  process.exit(1);
};
