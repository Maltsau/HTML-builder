const { stdout, stdin, exit } = process;
const fs = require("fs");
const os = require("os");
const path = require("path");

const eol = os.EOL;
const filePath = path.resolve(__dirname, "text.txt");

stdout.write("Введите текст:" + eol);

stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    stdout.write("До свиданья!" + eol);
    exit();
  } else {
    fs.appendFile(filePath, data, (err) => {
      if (err) throw err;
    });
  }
});
process.on("SIGINT", () => {
  stdout.write(eol + "До свиданья!" + eol);
  exit();
});


