const prisma = require('../lib/prisma');

const NotFoundError = require('../exeptions/NotFoundError');

class SocialMediaService {
  static async getSocialMedia() {
    const socialMedia = await prisma.socialMedia.findMany();

    return socialMedia;
  }

  static async createSocialMedia(payload) {
    const socialMedia = await prisma.socialMedia.upsert({
      where: {
        name: payload.name,
      },
      create: {
        ...payload,
      },
      update: {
        ...payload,
      },
    });

    return socialMedia;
  }

  static async updateSocialMedia(id, payload) {
    const findOne = await prisma.socialMedia.findUnique({
      where: {
        id,
      },
    });

    if (!findOne) {
      throw new NotFoundError('Social media not found');
    }

    const updatedSocialMedia = await prisma.socialMedia.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });

    return updatedSocialMedia;
  }

  static async deleteSocialMedia(id) {
    const findOne = await prisma.socialMedia.findUnique({
      where: {
        id,
      },
    });

    if (!findOne) {
      throw new NotFoundError('Social media not found');
    }

    await prisma.socialMedia.delete({
      where: {
        id,
      },
    });
  }
}

module.exports = SocialMediaService;
