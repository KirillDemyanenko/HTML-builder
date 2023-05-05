const fs = require("node:fs");
const stream = new fs.ReadStream(__dirname.concat("/text.txt"));
stream.pipe(process.stdout);
