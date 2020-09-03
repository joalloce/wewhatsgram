//mongoose db: wewhatsgram user: wewhatsgram pass: tFCCaXcmtIFfVDZO

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 8383;

const dbURI = "mongodb+srv://wewhatsgram:tFCCaXcmtIFfVDZO@clusterchat.xzph8.gcp.mongodb.net/wewhatsgram?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(port))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => res.send("hello"));
