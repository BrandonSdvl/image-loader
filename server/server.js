const PORT = process.env.PORT || 3000;
// const HOST = "http://localhost:" + process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/dist`));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/images`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.get("/images/:img", (req, res) => {
  let file = `${__dirname}/images/${req.params.img}`;
  fs.access(file, fs.constants.F_OK, err => {
    if (err) {
      res.send("File not found");
    } else {
      res.writeHead(200, { "content-type": "image/jpg" });
      fs.createReadStream(file).pipe(res);
    }
  });
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
