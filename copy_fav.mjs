import fs from 'fs';
import path from 'path';

const src = path.resolve('public/images/favicon.ico.jpeg');
const destPub = path.resolve('public/favicon.ico');
const destApp = path.resolve('src/app/favicon.ico');
const destPng = path.resolve('public/favicon.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, destPub);
  fs.copyFileSync(src, destApp);
  fs.copyFileSync(src, destPng);
  console.log('SUCCESSFULLY COPIED FAVICON TO public/favicon.ico AND src/app/favicon.ico!');
} else {
  console.error('Source file not found at:', src);
}
