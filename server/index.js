import bodyParser from "body-parser";
import express from "express";
import path from "path";
import routes, { IMAGES_BASE } from "./routes";

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 3001;
const server = express();

server.use(
  express.static(path.join(__dirname, "../client/build"), { index: false })
);
server.use(express.static(IMAGES_BASE, { index: false }));

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
