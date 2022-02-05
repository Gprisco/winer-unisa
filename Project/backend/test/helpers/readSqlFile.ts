import { readFileSync } from 'fs';

export default function readSqlFile(filepath: string): string[] {
  return readFileSync(filepath)
    .toString()
    .replace(/\r?\n|\r/g, '')
    .split(';')
    .filter((query) => query?.length);
}
