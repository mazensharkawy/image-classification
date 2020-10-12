import bodyParser from "body-parser";
import express from "express";
import path from "path";
import routes from "./routes";

const port = process.env.PORT || 3001;
const server = express();
server.use(
  express.static(path.join(__dirname, "../client/build"), { index: false })
);
server.use(bodyParser.json());
server.use("/api", routes);
server.use(express.static("./Images"));

server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
server.listen(port, err => {
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});
