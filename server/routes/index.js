import express from "express";
import { default as fs, promises as fsPromises } from "fs";
import _ from "lodash";
import mv from "mv";
import path from "path";

const router = express.Router();

const dev = process.env.NODE_ENV !== "production";

const ROOT_PATH = path.join(__dirname, "../..");
export const IMAGES_BASE = dev ? "./Images/" : "/srv/Images";
const CLASSIFIED_IMAGES_BASE = dev
  ? path.join(ROOT_PATH, `./ClassifiedImages`)
  : "/srv/ClassifiedImages";
const JSON_DATA_PATH = path.join(IMAGES_BASE, "data.json");

let imagesObject = {};

const moveAsync = (image, newPath, options = {}) => {
  return new Promise((resolve, reject) => {
    mv(image, newPath, options, err => {
      if (!err) return resolve();
      console.log(err);
      reject();
    });
  });
};
const findAndRemove = (project, value) => {
  const arr = imagesObject[project];
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  imagesObject = {
    ...imagesObject,
    [project]: arr
  };
};
const loadJSON = () => {
  try {
    let f = fs.readFileSync(JSON_DATA_PATH);
    return JSON.parse(f);
  } catch (e) {
    console.error(e);
    console.log("Loading data.json failed");
    return [];
  }
};
let projects = loadJSON();

const fetchImage = async projectName => {
  let imagesList = imagesObject[projectName];
  if (!imagesList) imagesList = await loadProjectImages(projectName);
  let classes = _.get(projects, `${projectName}.classes`);
  let formattedProjectName = _.replace(projectName, " ", "\\ ");
  let img = `/${formattedProjectName}/${imagesList[imagesList.length - 1]}`;
  return { img, classes, imagesRemaining: imagesList.length };
};
const requestImage = async (req, res) => {
  const projectName = req.params.project;
  const { img, classes, imagesRemaining } = await fetchImage(projectName);
  res.send({ img, classes, imagesRemaining });
};

const loadProjectImages = async projectName => {
  try {
    let imagesList = await fsPromises.readdir(
      path.join(IMAGES_BASE, projectName)
    );
    imagesObject = {
      ...imagesObject,
      [projectName]: imagesList
    };
    return imagesList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createProject = async (req, res) => {
  const { projectName, classes } = req.body;
  projects = {
    ...projects,
    [projectName]: {
      classes
    }
  };
  try {
    await fsPromises.writeFile(JSON_DATA_PATH, JSON.stringify(projects));
    res.send();
  } catch (err) {
    console.log({ err });
    res.status(500).send("Something Bad Happened");
  }
};
const getProjectsAvailable = (req, res) => {
  res.send({ projects });
};

const classifyImage = async (req, res) => {
  const { imageClass, project, image } = req.body;
  let imgName = image.split("/").slice(-1).pop();
  let newPath = path.join(
    CLASSIFIED_IMAGES_BASE,
    `${project}/${imageClass}/${imgName}`
  );
  const oldImgPath = path.join(IMAGES_BASE, `${image}`);
  try {
    moveAsync(oldImgPath, newPath, { mkdirp: true }).then(
      async () => await fetchImage(project)
    );
    findAndRemove(project, imgName);
    const { img, classes, imagesRemaining } = await fetchImage(project);
    res.send({ img, classes, imagesRemaining });
  } catch (error) {
    console.log({ error });
    return res.status(500).send();
  }
};
const discardImage = async (req, res) => {
  const { project, image } = req.body;
  try {
    await fsPromises.unlink(image);
    findAndRemove(project, imgName);
  } catch (error) {
    res.status(500).send();
  }
  const { imgUrl, classes, imagesRemaining } = fetchImage(project);
  res.send({
    img: imgUrl,
    classes,
    imagesRemaining
  });
};

// const move = (oldPath, newPath, callback) => {
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

export default router;
