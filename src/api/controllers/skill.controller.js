const { successResponse } = require('../../lib/response');
const SkillService = require('../../services/skill');
const skillValidation = require('../../validations/skill');

class SkillController {
  static getSkills = async (req, res, next) => {
    try {
      const filters = req.query;

      const skills = await SkillService.getSkills(filters);

      res.status(200).json(
        successResponse({
          message: 'Get skills success',
          data: skills,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static createSkill = async (req, res, next) => {
    try {
      skillValidation.validateCreateSkillPayload(req.body);

      const skill = await SkillService.createSkill({
        payload: {
          ...req.body,
          image: req.file,
        },
      });

      res.status(200).json(
        successResponse({
          message: 'Create skill success',
          data: skill,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static updateSkill = async (req, res, next) => {
    try {
      skillValidation.validateUpdateSkillPayload(req.body);

      const skill = await SkillService.updateSkill({
        id: req.params.id,
        payload: {
          ...req.body,
          image: req.file,
        },
      });

      res.status(200).json(
        successResponse({
          message: 'Update skill success',
          data: skill,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static deleteSkill = async (req, res, next) => {
    try {
      await SkillService.deleteSkill(req.params.id);

      res.status(200).json(
        successResponse({
          message: 'Delete skill success',
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SkillController;
