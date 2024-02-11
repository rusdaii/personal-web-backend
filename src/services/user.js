const prisma = require('../lib/prisma');

const NotFoundError = require('../exeptions/NotFoundError');
const FirebaseStorage = require('../lib/firebase/FirebaseStorage');
const CloudinaryStorage = require('../lib/cloudinary/CloudinaryStorage');
const folderStorage = require('../constants/folderStorage');

class UserService {
  static async getUser(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const { password, createdAt, updatedAt, ...result } = user;

    return result;
  }

  static async updateUserBasic({ user, payload }) {
    let avatarUrl = undefined;

    if (payload?.avatar) {
      ({ secure_url: avatarUrl } = await CloudinaryStorage.upload(
        payload.avatar,
        {
          folder: folderStorage.cloudinary.AVATAR,
        }
      ));
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        ...payload,
        avatar: avatarUrl,
      },
    });

    const { password, createdAt, updatedAt, ...result } = updatedUser;

    return result;
  }

  static async updateResume(id, payload) {
    let resumeUrl = undefined;

    if (payload) {
      ({ url: resumeUrl } = await FirebaseStorage.upload(payload, {
        folder: folderStorage.firebaseStorage.RESUME,
      }));
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        resume: resumeUrl,
      },
    });
  }
}

module.exports = UserService;
