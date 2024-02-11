const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const SkillController = require('../controllers/skill.controller');
const { upload } = require('../middlewares/uploadFile');

const router = require('express').Router();

router.get('/', SkillController.getSkills);
router.post(
  '/',
  authentication,
  authorization(['admin']),
  upload('icon')('single', ['image']),
  SkillController.createSkill
);
router.put(
  '/:id',
  authentication,
  authorization(['admin']),
  upload('icon')('single', ['image']),
  SkillController.updateSkill
);
router.delete(
  '/:id',
  authentication,
  authorization(['admin']),
  SkillController.deleteSkill
);

module.exports = router;
