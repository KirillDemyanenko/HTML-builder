function stop(text) {
  console.log(`\x1b[93m${text}\x1b[0m`);
  process.exit();
}
process.on("SIGINT", () => {
  stop("You pressed Ctrl+C. Goodbye!");
});
process.stdin.on("data", (data) => {
  data.toString().trim() !== "exit" || stop("You typed 'exit'. Goodbye!");
});
process.stdin.pipe(
  require("fs").createWriteStream(__dirname.concat("/file.txt"))
);
console.log("\x1b[32mHello! App starts! Enter text to write to filefsd\x1b[0m");
