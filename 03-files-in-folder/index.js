const { stdout } = process;
const fs = require("fs");
const os = require("os");
const path = require("path");

const eol = os.EOL;
const { readdir, stat } = fs.promises;
const folderPath = path.resolve(__dirname, "secret-folder");
const filesObj = readdir(folderPath, { withFileTypes: true });
filesObj.then((files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.resolve(__dirname, "secret-folder", file.name);
      const fileName = path.basename(filePath);
      const fileStats = stat(filePath);
      fileStats.then((data) => {
        const fileNameArr = fileName.split(".");
        const fileSize = data.size / 1024;
        stdout.write(
          `${fileNameArr[0]} - ${fileNameArr[1]} - ${fileSize}kb` + eol
        );
      });
    }
  });
});
