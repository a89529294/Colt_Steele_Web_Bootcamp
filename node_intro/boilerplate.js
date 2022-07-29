const fs = require("fs");
const folderName = process.argv[2] || "Project";

fs.mkdirSync(folderName);
fs.writeFileSync(`${folderName}/index.html`, "");
fs.writeFileSync(`${folderName}/index.css`, "");
fs.writeFileSync(`${folderName}/index.js`, "");
