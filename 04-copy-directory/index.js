const fs = require("node:fs");
const path = require("node:path");
fs.mkdir(path.join(__dirname, "/files-copy"), { recursive: true }, (error) => {
  if (error) throw error;
  fs.readdir(path.join(__dirname, "/files"), (error, files) => {
    if (error) throw error;
    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, "/files/", file),
        path.join(__dirname, "/files-copy/", file),
        (error) => {
          if (error) throw error;
        }
      );
    });
  });
});
