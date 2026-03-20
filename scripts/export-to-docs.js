const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outputDir = path.join(root, 'docs');
const pagesDir = path.join(root, '.next', 'server', 'pages');
const staticDir = path.join(root, '.next', 'static');

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  console.log('Exporting static site to', outputDir);
  removeDir(outputDir);
  fs.mkdirSync(outputDir, { recursive: true });

  // Copy the static HTML pages & JS from the Next build output
  copyDir(pagesDir, outputDir);

  // Copy the _next static assets
  copyDir(staticDir, path.join(outputDir, '_next'));

  // Create directory-based routes for GitHub Pages (e.g. /todos/)
  const htmlFiles = fs
    .readdirSync(outputDir)
    .filter(
      (filename) => filename.endsWith('.html') && !['index.html', '404.html', '500.html'].includes(filename)
    );

  for (const file of htmlFiles) {
    const name = file.replace(/\.html$/, '');
    const targetDir = path.join(outputDir, name);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(path.join(outputDir, file), path.join(targetDir, 'index.html'));
  }

  console.log('Export complete.');
}

main();
