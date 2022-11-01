let fs = require("node:fs");
let path = require("node:path");
fs.mkdir(path.join(__dirname, "/files-copy"), { recursive: true }, (error) => {
  if (error) {
    throw error;
  } else {
    fs.readdir(path.join(__dirname, "/files"), (error, files) => {
      if (error) {
        throw error;
      } else {
        for (file of files) {
          fs.copyFile(
            path.join(__dirname, "/files/" + file),
            path.join(__dirname, "/files-copy/" + file),
            (error) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      }
    });
  }
});
