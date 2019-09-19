const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
app.use(express.static("dist"));

app.listen(8080, () => console.log("Listening on port 4000!"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"), err => {
    if (err) {
      console.log("error");
      res.status(500).send(err);
    }
  });
});
