const fs = require("node:fs");
const path = require("node:path");
const writeStream = fs.createWriteStream(
  path.join(__dirname, "/project-dist/bundle.css")
);
fs.readdir(path.join(__dirname, "/styles"), (error, files) => {
  if (error) throw error;
  files.forEach((file) => {
    !path.extname(file).includes(".css") ||
      fs
        .createReadStream(path.join(__dirname, "/styles/", file))
        .pipe(writeStream);
  });
});
