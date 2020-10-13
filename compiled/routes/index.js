"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IMAGES_BASE = void 0;

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireWildcard(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _mv = _interopRequireDefault(require("mv"));

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express.default.Router();

var dev = process.env.NODE_ENV !== "production";

var ROOT_PATH = _path.default.join(__dirname, "../..");

var IMAGES_BASE = dev ? "./Images/" : "/srv/Images";
exports.IMAGES_BASE = IMAGES_BASE;
var CLASSIFIED_IMAGES_BASE = dev ? _path.default.join(ROOT_PATH, "./ClassifiedImages") : "/srv/ClassifiedImages";
var imagesObject = {};

var moveAsync = (image, newPath) => {
  return new Promise((resolve, reject) => {
    (0, _mv.default)(image, newPath, err => {
      if (!err) return resolve();
      console.log(err);
      reject();
    });
  });
};

var findAndRemove = (project, value) => {
  var arr = imagesObject[project];
  var index = arr.indexOf(value);

  if (index > -1) {
    arr.splice(index, 1);
  }

  imagesObject = _objectSpread(_objectSpread({}, imagesObject), {}, {
    [project]: arr
  });
};

var loadJSON = () => {
  try {
    var f = _fs.default.readFileSync("data.json");

    return JSON.parse(f);
  } catch (e) {
    console.error(e);
    console.log("Loading data.json failed");
    return [];
  }
};

var projects = loadJSON();

var fetchImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (projectName) {
    var imagesList = imagesObject[projectName];
    if (!imagesList) imagesList = yield loadProjectImages(projectName);

    var classes = _lodash.default.get(projects, "".concat(projectName, ".classes"));

    var formattedProjectName = _lodash.default.replace(projectName, " ", "\\ ");

    var img = "/".concat(formattedProjectName, "/").concat(imagesList[imagesList.length - 1]);
    return {
      img,
      classes,
      imagesRemaining: imagesList.length
    };
  });

  return function fetchImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var requestImage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var projectName = req.params.project;
    var {
      img,
      classes,
      imagesRemaining
    } = yield fetchImage(projectName);
    res.send({
      img,
      classes,
      imagesRemaining
    });
  });

  return function requestImage(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var loadProjectImages = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (projectName) {
    try {
      var imagesList = yield _fs.promises.readdir("".concat(IMAGES_BASE).concat(projectName));
      imagesObject = _objectSpread(_objectSpread({}, imagesObject), {}, {
        [projectName]: imagesList
      });
      return imagesList;
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  return function loadProjectImages(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var createProject = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      projectName,
      classes
    } = req.body;
    projects = _objectSpread(_objectSpread({}, projects), {}, {
      [projectName]: {
        classes
      }
    });

    try {
      yield _fs.promises.writeFile("data.json", JSON.stringify(projects));
      res.send();
    } catch (err) {
      console.log({
        err
      });
      res.status(500).send("Something Bad Happened");
    }
  });

  return function createProject(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getProjectsAvailable = (req, res) => {
  res.send({
    projects
  });
};

var classifyImage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      imageClass,
      project,
      image
    } = req.body;
    var imgName = image.split("/").slice(-1).pop();

    var newPath = _path.default.join(CLASSIFIED_IMAGES_BASE, "".concat(project, "/").concat(imageClass, "/").concat(imgName));

    var oldImgPath = _path.default.join(IMAGES_BASE, "".concat(image));

    try {
      moveAsync(oldImgPath, newPath).then( /*#__PURE__*/_asyncToGenerator(function* () {
        return yield fetchImage(project);
      }));
      findAndRemove(project, imgName);
      var {
        img,
        classes,
        imagesRemaining
      } = yield fetchImage(project);
      res.send({
        img,
        classes,
        imagesRemaining
      });
    } catch (error) {
      console.log({
        error
      });
      return res.status(500).send();
    }
  });

  return function classifyImage(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var discardImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var {
      project,
      image
    } = req.body;

    try {
      _fs.default.unlink(image, callback);

      yield moveAsync(image, newPath);
    } catch (error) {
      res.status(500).send();
    }

    var {
      imgUrl,
      classes,
      imagesRemaining
    } = fetchImage(project);
    res.send({
      img: imgUrl,
      classes,
      imagesRemaining
    });
  });

  return function discardImage(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}(); // const move = (oldPath, newPath, callback) => {
//   fs.rename(oldPath, newPath, function (err) {
//     if (err) {
//       if (err.code === "EXDEV") {
//         copy();
//       } else {
//         callback(err);
//       }
//       return;
//     }
//     callback();
//   });
// function copy(oldPath, newPath, callback) {
//   try {
//     var readStream = fs.createReadStream(oldPath);
//     var writeStream = fs.createWriteStream(newPath);
//     readStream.on("error", callback);
//     writeStream.on("error", callback);
//     readStream.on("close", function () {
//       fs.unlink(oldPath, callback);
//     });
//     readStream.pipe(writeStream);
//   } catch(error) {
//     console.log(error)
//     callback("Error moving file")
//   }
// }


router.get("/projects", getProjectsAvailable);
router.post("/create-project", createProject);
router.get("/request-image/:project", requestImage);
router.post("/classify-image", classifyImage);
router.post("/discard-image", discardImage);
var _default = router;
exports.default = _default;