//mongoose db: wewhatsgram user: wewhatsgram pass: tFCCaXcmtIFfVDZO

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

var corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const port = 8383;

//database connection
const dbURI =
  "mongodb+srv://wewhatsgram:tFCCaXcmtIFfVDZO@clusterchat.xzph8.gcp.mongodb.net/wewhatsgram?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => server.listen(port))
  .catch((err) => {
    console.log(err);
  });

//ws
const server = http.createServer();
const wss = new WebSocket.Server({ server });
server.on("request", app);

wss.on("connection", function connection(ws){
  ws.on("message", function incoming(data) {
    wss.clients.forEach(client=>{
      if(client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  });
});

app.get("/", (req, res) => res.send("hello"));
app.use(authRoutes);
