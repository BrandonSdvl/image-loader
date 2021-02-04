const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

app.use(cors());
let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./server/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./dist"));

app.get("/", cors(corsOptions), (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile("./dist/index.html");
});

app.get("/upload", cors(corsOptions));

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
      console.log("El archivo no existe");
      res.send("File not found");
    } else {
      res.writeHead(200, { "content-type": "image/jpg" });
      fs.createReadStream(file).pipe(res);
      console.log("El archivo existe");
    }
  });
});

app.get("/images", (req, res) => {
  res.send("Go to main page to upload an image");
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
