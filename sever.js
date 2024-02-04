const express = require('express');
const http = require('http');
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
app.set("port", PORT);
const path = require('path');


app.use(express.json());


app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("*", (req, res) => {
  console.log(`Запрошенный адрес: ${req.url}`);
  const filePath = req.url.substr(1);

  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).send("Resource not found!");
    } else {
      fs.createReadStream(filePath).pipe(res);
    }
  });
});


server.listen(PORT, function () {
  console.log("start server on", PORT);
});
