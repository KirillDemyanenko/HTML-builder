const fs = require("node:fs");
const path = require("node:path");
//Creates a copy of files and folders from assets
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
fs.open(path.join(__dirname, "/project-dist/style.css"), "w", (err) => {
  fs.readdir(path.join(__dirname, "/styles"), (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (file.split(".")[1] === "css") {
        fs.readFile(path.join(__dirname, "/styles/" + file), (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, "/project-dist/style.css"),
            data,
            (err) => {
              if (err) throw err;
            }
          );
        });
      }
    }
  });
});
fs.readFile(path.join(__dirname, "template.html"), function (err, data) {
  if (err) throw err;
  let array = data.toString().split("\n");
  var tempArr = [];
  for (i in array) {
    if (array[i].includes("{{") && array[i].includes("}}")) {
      fs.readFile(
        path.join(
          __dirname,
          "/components/" +
            array[i].replace("{{", "").replace("}}", "").trim() +
            ".html"
        ),
        (err, data1) => {
          if (err) throw err;
          let compArr = data1.toString().split("\n");
          for (let c of compArr) {
            fs.appendFile(
              path.join(__dirname, "/project-dist/index.html"),
              c,
              (err) => {
                if (err) throw err;
              }
            );
          }
        }
      );
    } else {
      fs.appendFile(
        path.join(__dirname, "/project-dist/index.html"),
        array[i],
        (err) => {
          if (err) throw err;
        }
      );
    }
  }
  for (let ar of tempArr) {
    console.log(ar);
  }
});
// fs.open(path.join(__dirname, "project-dist/index.html"), "r+", (err, fd) => {
//   if (err) {
//     fs.stat(path.join(__dirname, "/project-dist/index.html"), (err) => {
//       if (err) {
//         fs.stat(path.join(__dirname, "/project-dist"), (err) => {
//           if (err) {
//             fs.mkdir(path.join(__dirname, "/project-dist"), (err) => {});
//           }
//           fs.copyFile(
//             path.join(__dirname, "template.html"),
//             path.join(__dirname, "project-dist/index.html"),
//             (err) => {
//               if (err) throw err;
//             }
//           );
//         });
//       }
//       fs.readFile(
//         path.join(__dirname, "project-dist/index.html"),
//         "utf-8",
//         (err, data) => {
//           console.log(data);
//         }
//       );
//     });
//   }
// });
