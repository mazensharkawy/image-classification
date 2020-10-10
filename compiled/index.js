"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3001;
var server = (0, _express.default)();
server.use(_bodyParser.default.json());
server.use("/api", _routes.default);
server.use(_express.default.static('./Images'));
server.listen(port, err => {
  if (err) throw err;
  console.log("Server listening on ".concat(port));
});