import express from "express";
import { promises as fs } from "fs";
const router = express.Router();
let projects = fs.readfilesync("./data.json");

const createProject = async ({ projectName, classes }) => {
  projects = {
    ...projects,
    [projectName]: {
      classes,
    },
  };
  await fs.writeFile('data.json', JSON.stringify(projects))
  res.status(200).send()
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
    imagesRemaining,
  });
};
const classifyImage = (req, res) => {
  const { imageClass, project, image } = req.body;
  const { imgUrl, classes, imagesRemaining } = readImage(project);
  res.send({
    img: imgUrl,
    classes,
    imagesRemaining,
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
