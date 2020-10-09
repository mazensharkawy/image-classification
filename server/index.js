import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";

const port = process.env.PORT || 3001;
const server = express();

server.use(bodyParser.json());
server.use("/api", routes);
server.use(express.static('./Images'))

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});
