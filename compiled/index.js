"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireWildcard(require("./routes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUILD_BASE = _path.default.join(__dirname, "../client/build");

var port = process.env.PORT || 3001;
var server = (0, _express.default)();
console.log({
  BUILD_BASE,
  IMAGES_BASE: _routes.IMAGES_BASE
});
server.use(_express.default.static(_routes.IMAGES_BASE, {
  index: false
}));
server.use(_express.default.static(BUILD_BASE, {
  index: false
}));
server.use(_bodyParser.default.json());
server.use("/api", _routes.default);
server.get("/*", function (req, res) {
  res.sendFile(_path.default.join(__dirname, "../client/build", "index.html"));
});
server.listen(port, err => {
  if (err) throw err;
  console.log("".concat(process.env.NODE_ENV || "Development", " Server listening on ").concat(port));
});