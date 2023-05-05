const fs = require("fs");
const path = require("path");
const { readdir, copyFile, unlink } = fs.promises;

const srcPath = path.resolve(__dirname, "files");
const distPath = path.resolve(__dirname, "files-copy");
fs.mkdir(distPath, { recursive: true }, (err) => {
  if (err) throw err;
});
const distFilesObj = readdir(distPath);
distFilesObj.then((files) => {
  files.forEach((file) => {
    if (file) unlink(path.resolve(distPath, file));
  });
});
const srcFilesObj = readdir(srcPath);
srcFilesObj.then((files) => {
  files.forEach((file) => {
    copyFile(path.resolve(srcPath, file), path.resolve(distPath, file));
  });
});
