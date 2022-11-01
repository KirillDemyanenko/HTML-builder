const fs = require("fs"), path = require('path');
let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'));
stream.on('readable', () => {
  let data;
  while (data = stream.read()) {
    console.log(data.toString());
  }
});
stream.on('end', () => {console.log('end_of_file')})
stream.on('error', (error) => console.log(error))
