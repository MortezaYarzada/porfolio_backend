const router = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    technologies: req.body.technologies,
    githubUrl: req.body.githubUrl,
    liveUrl: req.body.liveUrl,
    featured: req.body.featured,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', getProject, (req, res) => {
  res.json(res.project);
});

router.patch('/:id', getProject, async (req, res) => {
  if (req.body.title != null) {
    res.project.title = req.body.title;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  if (req.body.image != null) {
    res.project.image = req.body.image;
  }
  if (req.body.category != null) {
    res.project.category = req.body.category;
  }
  if (req.body.technologies != null) {
    res.project.technologies = req.body.technologies;
  }
  if (req.body.githubUrl != null) {
    res.project.githubUrl = req.body.githubUrl;
  }
  if (req.body.liveUrl != null) {
    res.project.liveUrl = req.body.liveUrl;
  }
  if (req.body.featured != null) {
    res.project.featured = req.body.featured;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: 'Deleted Project' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

module.exports = router;
