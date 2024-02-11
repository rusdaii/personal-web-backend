const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const ProjectController = require('../controllers/project.controller');
const { upload } = require('../middlewares/uploadFile');

const router = require('express').Router();

router.get('/', ProjectController.getProjects);
router.post(
  '/',
  authentication,
  authorization(['admin']),
  upload('image')('single', ['image']),
  ProjectController.createProject
);
router.put(
  '/:id',
  authentication,
  authorization(['admin']),
  upload('image')('single', ['image']),
  ProjectController.updateProject
);
router.delete(
  '/:id',
  authentication,
  authorization(['admin']),
  ProjectController.deleteProject
);

module.exports = router;
