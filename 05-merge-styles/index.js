const fs = require("fs");
const os = require("os");
const path = require("path");
const { readdir } = fs.promises;

const eol = os.EOL;
const srcPath = path.resolve(__dirname, "styles");
const distPath = path.resolve(__dirname, "project-dist", "bundle.css");

const srcFilesObj = readdir(srcPath);
const writeStream = fs.createWriteStream(distPath);

srcFilesObj.then((files) => {
  files.forEach((file) => {
    const filePath = path.resolve(__dirname, "styles", file);
    if (path.extname(filePath) === ".css") {
      const readStream = fs.createReadStream(filePath, "utf-8");
      readStream.on("data", (data) => {
        writeStream.write(data.toString() + eol);
      });
    }
  });
});
