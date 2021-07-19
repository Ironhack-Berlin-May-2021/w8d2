const router = require("express").Router();
const Project = require('../models/Project');

router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      next(err)
    })
});


router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json(project);
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      next(err)
    })
});

router.post("/", (req, res, next) => {
  const { title, description } = req.body;
  Project.create({
    title,
    description
  })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      next(err);
    })
});

router.put('/:id', (req, res, next) => {
  const { title, description } = req.body;
  Project.findByIdAndUpdate(req.params.id, { title, description }, { new: true })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      next(err);
    })
});

router.delete('/:id', (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'project deleted' });
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
