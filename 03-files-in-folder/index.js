const fs = require("node:fs");
const path = require("node:path");
fs.readdir(path.join(__dirname, "/secret-folder"), (error, files) => {
  files.forEach((file) => {
    fs.stat(
      path.join(__dirname, "/secret-folder/", file),
      (err, stat) =>
        !stat.isFile() ||
        console.log(
          `${file.split(".").at(0)} - ${file.split(".").at(1)} - ${(
            stat.size / 1024
          ).toFixed(3)}kb`
        )
    );
  });
});
