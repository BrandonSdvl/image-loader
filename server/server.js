const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

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
  res.sendFile("./public/index.html");
});

app.get("/upload", cors(corsOptions));

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ response: "success", message: "Image Uploaded" });
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
