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

const { stdout, stdin, exit } = process;
const fs = require("fs");
const os = require("os");
const path = require("path");

const promises = fs.promises;
const folderPath = path.resolve(__dirname, "secret-folder");


