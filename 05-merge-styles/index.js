const fs = require("node:fs");
const path = require("node:path");
fs.open(path.join(__dirname, "/project-dist/bundle.css"), "w", (err) => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, "/styles/"), (err, files) => {
  for (let file of files) {
    let separatedFileName = file.split(".");
    if (separatedFileName[1] === "css") {
      fs.readFile(
        path.join(__dirname, "/styles/" + separatedFileName.join(".")),
        (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, "/project-dist/bundle.css"),
            data,
            (err) => {
              if (err) throw err;
            }
          );
        }
      );
    }
  }
});
