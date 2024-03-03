"use strict";
const express = require("express");
const app = express();
const PORT = 3000;

app.use("/static", express.static(__dirname + "/public"));

// HTTPSの場合↓
const fs = require("fs");
const https = require("https");
const options = {
  key: fs.readFileSync("./cert/localhost.key"),
  cert: fs.readFileSync("./cert/localhost.crt"),
};
const server = https.createServer(options, app);
server.listen(PORT);
// HTTPSの場合↑

// HTTPの場合↓
// app.listen(PORT, () => {
//   console.log(`開始... 開発用サーバ in port ${PORT}`);
// });
// HTTPの場合↑
