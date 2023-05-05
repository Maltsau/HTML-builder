const { stdout } = process;
const fs = require("fs");
const os = require("os");
const path = require("path");
const { readdir, copyFile } = fs.promises;

const srcPath = path.resolve(__dirname, "files");
const distPath = path.resolve(__dirname, "files-copy");
fs.mkdir(distPath, { recursive: true }, (err) => {
  if (err) throw err;
});
const filesObj = readdir(srcPath);
filesObj.then((files) => {
  files.forEach((file) => {
    copyFile(path.resolve(srcPath, file), path.resolve(distPath, file));
  });
});
