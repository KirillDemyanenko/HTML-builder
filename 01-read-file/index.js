const fs = require("node:fs");
const path = require("node:path");
const stream = new fs.ReadStream(path.join(__dirname, "text.txt"));
stream.on("readable", () => {
  while ((data = stream.read())) {
    console.log(data.toString());
  }
});
stream.on("end", () => {
  console.log("end_of_file");
});
stream.on("error", (error) => console.error(error));
