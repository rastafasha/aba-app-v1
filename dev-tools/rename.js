const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../src/app"); // Cambia la ruta si es necesario

function renameRoutingFiles(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stat) => {
        if (err) {
          return console.error("Unable to stat file: " + err);
        }

        if (stat.isDirectory()) {
          // Llamar recursivamente si es un directorio
          renameRoutingFiles(filePath);
        } else if (file.endsWith("-routing.module.ts")) {
          const newFileName = file.replace("-routing.module.ts", ".routing.ts");
          const newFilePath = path.join(dir, newFileName);

          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              return console.error("Error renaming file: " + err);
            }
            console.log(`Renamed: ${filePath} -> ${newFilePath}`);
          });
        }
      });
    });
  });
}

renameRoutingFiles(directoryPath);
