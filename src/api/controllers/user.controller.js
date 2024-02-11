const { successResponse } = require('../../lib/response');
const UserService = require('../../services/user');

class UserController {
  static getUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await UserService.getUser(id);

      res.status(200).json(
        successResponse({
          message: 'Get users success',
          data: user,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static updateUserBasic = async (req, res, next) => {
    try {
      const user = req.user;

      const updatedUser = await UserService.updateUserBasic({
        user,
        payload: {
          ...req.body,
          avatar: req.file,
        },
      });

      res.status(200).json(
        successResponse({
          message: 'Update user success',
          data: updatedUser,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  static updateResume = async (req, res, next) => {
    try {
      const user = req.user;

      const payload = req.file;

      await UserService.updateResume(user.id, payload);

      res.status(200).json(
        successResponse({
          message: 'Update resume success',
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
