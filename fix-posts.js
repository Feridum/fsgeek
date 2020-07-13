const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, './content/posts');

fs.readdir(directoryPath, function (err, files) {

  files.forEach(function (file) {
    const filePath = path.join(__dirname, './content/posts', file);
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/(?<=---.+)=(?=.+---)/gs, ':');

      fs.writeFile(filePath, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
});