const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const userController = require('../controllers/user.controller');
const { upload } = require('../middlewares/uploadFile');

const router = require('express').Router();

router.get('/:id', userController.getUser);
router.put(
  '/update/basic',
  authentication,
  authorization(['admin']),
  upload('image')('single', ['avatar']),
  userController.updateUserBasic
);
router.put(
  '/update/resume',
  authentication,
  authorization(['admin']),
  upload('pdf')('single', ['resume']),
  userController.updateResume
);

module.exports = router;
