const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const AuthenticationError = require('../exeptions/AuthenticationError');
const { generateAccessToken } = require('../lib/token');

class AuthService {
  static async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AuthenticationError('User or password incorrect');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new AuthenticationError('User or password incorrect');
    }

    const accessTokenPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const accessToken = generateAccessToken(accessTokenPayload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }
}

module.exports = AuthService;
