import fs from 'fs';
import path from 'path';

export const fileLog = (file: string, log: string) => {
  const filePath = path.resolve(path.join('logs', `${file}.log`));
  fs.writeFile(filePath, log, { flag: 'a' }, (err) => err);
};

export const fileLogSync = (file: string, log: string) => {
  const filePath = path.resolve(path.join('logs', `${file}.log`));
  fs.writeFileSync(filePath, log, { flag: 'a' });
};
