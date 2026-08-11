import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('./images');
const destDir = path.resolve('./public/images');

fs.mkdirSync(destDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(srcDir, destDir);

// Copy favicon to public/favicon.ico and src/app/favicon.ico
const favSrc = path.resolve('./public/images/favicon.ico.jpeg');
const favDest = path.resolve('./public/favicon.ico');
const favDestApp = path.resolve('./src/app/favicon.ico');

if (fs.existsSync(favSrc)) {
  fs.copyFileSync(favSrc, favDest);
  fs.copyFileSync(favSrc, favDestApp);
  console.log('Successfully copied favicon.ico');
}

console.log('Successfully copied images to public/images');
