const fs = require("fs");
const os = require("os");
const path = require("path");

const { mkdir } = fs;
const eol = os.EOL;
const { readdir, readFile, writeFile } = fs.promises;

// creating folder project-dist, assets and all internal folders
async function formFolders() {
  mkdir(path.resolve(__dirname, "project-dist"), { recursive: true }, (err) => {
    if (err) throw err;
  });

  mkdir(
    path.resolve(__dirname, "project-dist", "assets"),
    { recursive: true },
    (err) => {
      if (err) throw err;
    }
  );

  const folderList = await readdir(path.resolve(__dirname, "assets"), {
    withFileTypes: true,
  });
  folderList.forEach((folder) => {
    if (folder.isDirectory()) {
      mkdir(
        path.resolve(__dirname, "project-dist", "assets", folder.name),
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
}

// Building HTML
async function formHtml() {
  let htmlString = await readFile(
    path.resolve(__dirname, "template.html"),
    "utf-8"
  );
  const components = await readdir(path.resolve(__dirname, "components"), {
    withFileTypes: true,
  });
  for (let componentItem of components) {
    if (componentItem.name.split(".")[1] === "html") {
      const component = await readFile(
        path.resolve(__dirname, "components", componentItem.name),
        "utf-8"
      );
      htmlString = await htmlString.replaceAll(
        `{{${componentItem.name.split(".")[0]}}}`,
        component
      );
    }
  }

  await writeFile(
    path.resolve(__dirname, "project-dist", "index.html"),
    htmlString
  );
}

// merging styles
function mergeStyles() {
  const styleSrcPath = path.resolve(__dirname, "styles");
  const styleDistPath = path.resolve(__dirname, "project-dist", "style.css");

  const srcFilesObj = readdir(styleSrcPath);
  const writeStream = fs.createWriteStream(styleDistPath);

  srcFilesObj.then((files) => {
    files.forEach((file) => {
      const filePath = path.resolve(__dirname, "styles", file);
      if (path.extname(filePath) === ".css") {
        const readStream = fs.createReadStream(filePath, "utf-8");
        readStream.on("data", (data) => {
          writeStream.write(data + eol);
        });
      }
    });
  });
}

// copying assets folder
const assetsSrcPath = path.resolve(__dirname, "assets");
const assetsDistPath = path.resolve(__dirname, "project-dist", "assets");

function copyAssets(srcFolderPath, distFolderPath) {
  const filesObj = readdir(srcFolderPath, { withFileTypes: true });
  filesObj.then((files) => {
    files.forEach((item) => {
      if (item.isFile()) {
        fs.copyFile(
          path.resolve(srcFolderPath, item.name),
          path.resolve(distFolderPath, item.name),
          (err) => {
            if (err) throw err;
          }
        );
      } else if (item.isDirectory()) {
        mkdir(
          path.resolve(distFolderPath, item.name),
          { recursive: true },
          (err) => {
            if (err) throw err;
          }
        );
        copyAssets(
          path.resolve(srcFolderPath, item.name),
          path.resolve(distFolderPath, item.name)
        );
      }
    });
  });
}

(async function formDocument() {
  await formFolders();
  copyAssets(assetsSrcPath, assetsDistPath);
  formHtml();
  mergeStyles();
})();
