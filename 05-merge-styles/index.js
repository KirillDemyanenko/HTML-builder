let fs = require("node:fs");
let path = require("node:path");
fs.open(path.join(__dirname, "/project-dist/bundle.css"), "w", (err) => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, "/styles/"), (err, files) => {
  for (let file of files) {
    let splitedFileName = file.split(".");
    if (splitedFileName[1] === "css") {
      fs.readFile(
        path.join(__dirname, "/styles/" + splitedFileName.join(".")),
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
