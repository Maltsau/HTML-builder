const { stdout } = process;
const fs = require("fs");

const readStream = fs.createReadStream(__dirname + "/text.txt", "utf8");

readStream.on("data", (chunk) => {
  stdout.write(chunk);
});
