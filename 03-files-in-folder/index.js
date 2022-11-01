let fs = require("node:fs");
let path = require("node:path");
fs.readdir(path.join(__dirname, "/secret-folder"), (error, files) => {
  if (error) {
    throw new Error(error);
  } else {
    for (file of files) {
      let fileName = file.split(".");
      fs.stat(
        path.join(__dirname, "/secret-folder/" + file),
        (error, fileStats) => {
          if (error) {
            throw new Error(error);
          } else {
            if (fileStats.isFile()) {
              console.log(
                `${fileName[0]} - ${fileName[1]} - ${(
                  fileStats["size"] / 1024
                ).toFixed(3)}kb`
              );
            }
          }
        }
      );
    }
  }
});
