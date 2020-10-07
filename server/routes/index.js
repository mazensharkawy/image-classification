import express from "express";
import { default as fs, promises as fsPromises } from "fs";
const router = express.Router();
const loadJSON = () => {
  try {
    let f = fs.readFileSync("data.json");
    return JSON.parse(f);
  } catch (e) {
    console.error(e);
    console.log("Loading data.json failed");
    return [];
  }
};
let projects = loadJSON()
const createProject = async (req, res) => {
  const { projectName, classes } = req.body;
  console.log("Creating a project", { oldprojects: projects });
  projects = {
    ...projects,
    [projectName]: {
      classes
    }
  };
  console.log({ projects });
  await fsPromises
    .writeFile("data.json", JSON.stringify(projects))
    .catch(error => console.log(error));
  res.status(200).send();
};
const getProjectsAvailable = (req, res) => {
  res.send({ projects });
};
const requestImage = (req, res) => {
  const project = req.params.project;
  const { imgUrl, classes, imagesRemaining } = readImage(project);
  res.send({
    img: imgUrl,
    classes,
    imagesRemaining
  });
};
const classifyImage = (req, res) => {
  const { imageClass, project, image } = req.body;
  const { imgUrl, classes, imagesRemaining } = readImage(project);
  res.send({
    img: imgUrl,
    classes,
    imagesRemaining
  });
};

const readImage = () => {
  return { img: "url", classes: [], imagesRemaining: 0 };
};

router.get("/request-image/:project", requestImage);
router.get("/projects", getProjectsAvailable);
router.post("/classify-image", classifyImage);
router.post("/create-project", createProject);

export default router;
