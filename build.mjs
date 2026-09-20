import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const parts = [
  'site.part00',
  'site.part01',
  'site.part02',
  'site.part03a',
  'site.part03b',
  'site.part03c',
  'site.part04a',
  'site.part04b',
  'site.part04c',
  'site.part05a',
  'site.part05b'
];

const b64 = parts.map(p => fs.readFileSync(p, 'utf8')).join('');
const tgz = Buffer.from(b64, 'base64');

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('site.tar.gz', tgz);

execFileSync(
  'tar',
  ['-xzf', 'site.tar.gz', '-C', 'dist', '--strip-components=1'],
  { stdio: 'inherit' }
);

console.log('Static website extracted to dist/');
