const { successResponse } = require('../../lib/response');
const AuthService = require('../../services/auth');
const authValidation = require('../../validations/auth');

class AuthController {
  static loginUser = async (req, res, next) => {
    try {
      authValidation.validateLoginPayload(req.body);

      const { user, accessToken } = await AuthService.login(req.body);

      res.status(200).json(
        successResponse({
          message: 'Login success',
          data: {
            accessToken,
            user,
          },
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
