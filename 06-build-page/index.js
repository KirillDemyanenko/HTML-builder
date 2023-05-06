const fs = require("node:fs");
const path = require("node:path");
const writeStream = fs.createWriteStream(
  path.join(__dirname, "/project-dist/style.css")
);
fs.writeFile(path.join(__dirname, "/project-dist/index.html"), "", (err) => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, "/styles"), (error, files) => {
  if (error) throw error;
  files.forEach((file) => {
    !path.extname(file).includes(".css") ||
      fs
        .createReadStream(path.join(__dirname, "/styles/", file))
        .pipe(writeStream);
  });
});
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
fs.readFile(path.join(__dirname, "template.html"), (err, data) => {
  if (err) throw err;
  const array = data.toString().split("\n");
  array.forEach((str) => {
    if (str.indexOf("{{") > -1) {
      fs.readFile(
        path.join(
          __dirname,
          "components",
          str.trim().replace("{{", "").replace("}}", "").concat(".html")
        ),
        (err1, data1) => {
          fs.appendFile(
            path.join(__dirname, "/project-dist/index.html"),
            data1.toString().concat("\n"),
            (err) => {
              if (err) throw err;
            }
          );
        }
      );
    } else {
      fs.appendFile(
        path.join(__dirname, "/project-dist/index.html"),
        str.concat("\n"),
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
});
