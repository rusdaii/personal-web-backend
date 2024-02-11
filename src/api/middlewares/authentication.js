const { NOT_FOUND_ERR } = require('../../constants/errorType');
const AuthenticationError = require('../../exeptions/AuthenticationError');
const { decodeToken } = require('../../lib/token');

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers?.authorization;

    if (!bearerToken) {
      throw new AuthenticationError();
    }

    const token = bearerToken.split(' ')[1];

    const user = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    req.user = user;
    next();
  } catch (error) {
    if (error?.type === NOT_FOUND_ERR) {
      next(new AuthenticationError());
    }

    next(error);
  }
};

module.exports = authentication;
