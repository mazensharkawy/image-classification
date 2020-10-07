import express from "express";
const router = express.Router();

const getProjectsAvailable = (req, res) => {
  // /api/getProjects
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
router.get("/getProjects", getProjectsAvailable);
router.post("/classify-image", classifyImage);

export default router;
