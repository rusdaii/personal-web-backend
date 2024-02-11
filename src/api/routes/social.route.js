const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const SocialMediaController = require('../controllers/social.controller');

const router = require('express').Router();

router.get('/', SocialMediaController.getSocialMedia);
router.post(
  '/',
  authentication,
  authorization(['admin']),
  SocialMediaController.createSocialMedia
);
router.put(
  '/:id',
  authentication,
  authorization(['admin']),
  SocialMediaController.updateSocialMedia
);
router.delete(
  '/:id',
  authentication,
  authorization(['admin']),
  SocialMediaController.deleteSocialMedia
);

module.exports = router;
