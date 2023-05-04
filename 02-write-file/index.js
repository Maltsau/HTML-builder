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

/* process.stdin - поток ввода; process.stdout - поток вывода; process.stderr - поток ошибки как разновидность потока вывода */

// stdout.write("What is yuur name?\n"); /* console.log("What is yuur name?) */
// /* subscribe on console event "data" of strdin object, that writes "data" to console */
// stdin.on("data", (data) => {
//   stdout.write(`Hello, ${data}`);
//   exit();
// });
// process.on("exit", () => stdout.write("Удачи в изучении Node.js!\n"));

// console.log(path.parse(__filename));
// console.log(path.join(__dirname, "./index", "/README.md"));
// console.log(__dirname);
// console.log(process.argv);
