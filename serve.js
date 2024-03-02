"use strict";
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.static(__dirname));

// HTTPSの場合↓
let fs = require("fs");
let https = require("https");
let options = {
  key: fs.readFileSync("./cert/localhost.key"),
  cert: fs.readFileSync("./cert/localhost.crt"),
};
let server = https.createServer(options, app);
// HTTPSの場合↑

// HTTPの場合↓
// app.listen(PORT, () => {
//   console.log(`開始... KINTONE jsカスタマイズ配置用開発サーバ in port ${PORT}`);
// });
// HTTPの場合↑

app.get("/src/:file", (req, res) => {
  const file = req.params.file;

  res.sendFile(`${__dirname}/src/${file}`);
  console.log(`/src/${file} へアクセスがありました`);
});

app.get("batchUpdate/src/:file", (req, res) => {
  const file = req.params.file;

  res.sendFile(`${__dirname}/batchUpdate/src/${file}`);
  console.log(`/batchUpdate/src/${file} へアクセスがありました`);
});

// HTTPSの場合↓
server.listen(PORT);
// HTTPSの場合↑
