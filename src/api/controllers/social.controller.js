const { successResponse } = require('../../lib/response');
const SocialMediaService = require('../../services/social');
const socialValidation = require('../../validations/social');

class SocialMediaController {
  static getSocialMedia = async (req, res, next) => {
    try {
      const socialMedia = await SocialMediaService.getSocialMedia();

      res.status(200).json(
        successResponse({
          message: 'Get social media success',
          data: socialMedia,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static createSocialMedia = async (req, res, next) => {
    try {
      socialValidation.validateCreatePayload(req.body);

      const socialMedia = await SocialMediaService.createSocialMedia(req.body);

      res.status(200).json(
        successResponse({
          message: 'Create social media success',
          data: socialMedia,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static updateSocialMedia = async (req, res, next) => {
    try {
      socialValidation.validateUpdatePayload(req.body);

      const socialMedia = await SocialMediaService.updateSocialMedia(
        req.params.id,
        req.body
      );

      res.status(200).json(
        successResponse({
          message: 'Update social media success',
          data: socialMedia,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteSocialMedia = async (req, res, next) => {
    try {
      await SocialMediaService.deleteSocialMedia(req.params.id);

      res.status(200).json(
        successResponse({
          message: 'Delete social media success',
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SocialMediaController;
