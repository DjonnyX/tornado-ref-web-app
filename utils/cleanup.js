const fs = require('fs');
const Path = require('path');
const args = process.argv.slice(2);

if (args.length === 0) {
    throw Error("Необходимо указать каталог для очистки");
}

const cleanupPath = args[0];

const deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(cleanupPath);