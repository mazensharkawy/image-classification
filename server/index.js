import bodyParser from "body-parser";
import express from "express";
import path from "path";
import routes, { IMAGES_BASE } from "./routes";

const BUILD_BASE = path.join(__dirname, "../client/build");
const port = process.env.PORT || 3001;
const server = express();

console.log({ BUILD_BASE, IMAGES_BASE });
server.use(express.static(IMAGES_BASE, { index: false }));
server.use(express.static(BUILD_BASE, { index: false }));
server.use(bodyParser.json());
server.use("/api", routes);

server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
server.listen(port, err => {
  if (err) throw err;
  console.log(
    `${process.env.NODE_ENV || "Development"} Server listening on ${port}`
  );
});
