const fs = require("node:fs");
const path = require("node:path");
fs.mkdir(
  path.join(__dirname, "project-dist/assets"),
  { recursive: true },
  (err) => {
    if (err) throw err;
    fs.readdir(
      path.join(__dirname, "/assets"),
      { withFileTypes: true },
      (err, files) => {
        for (let file of files) {
          if (file.isDirectory()) {
            let dir = file.name;
            fs.mkdir(
              path.join(__dirname, "project-dist/assets/" + dir),
              { recursive: true },
              (err) => {
                if (err) throw err;
              }
            );
            fs.readdir(path.join(__dirname, "/assets/" + dir), (err, files) => {
              if (err) throw err;
              for (let file of files) {
                fs.copyFile(
                  path.join(__dirname, "/assets/" + dir + "/" + file),
                  path.join(
                    __dirname,
                    "/project-dist/assets/" + dir + "/" + file
                  ),
                  (err) => {
                    if (err) throw err;
                  }
                );
              }
            });
          }
        }
      }
    );
  }
);
