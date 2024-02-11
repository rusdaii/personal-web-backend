const AuthorizationError = require('../../exeptions/AuthorizationError');

exports.authorization = (roleAccepted) => async (req, res, next) => {
  try {
    const { role } = req.user;

    if (!roleAccepted.includes(role)) {
      throw new AuthorizationError();
    }

    next();
  } catch (error) {
    next(error);
  }
};
