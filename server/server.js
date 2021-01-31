const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./server/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./dist"));

app.get("/", (req, res) => {
  return res.send("This is the home page");
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  res.send("Todo bien");
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
