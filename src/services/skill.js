const prisma = require('../lib/prisma');

const NotFoundError = require('../exeptions/NotFoundError');
const CloudinaryStorage = require('../lib/cloudinary/CloudinaryStorage');
const folderStorage = require('../constants/folderStorage');
const InvariantError = require('../exeptions/InvariantError');

class SkillService {
  static getFilteredSkills(filters) {
    return {
      where: {
        name: {
          contains: filters?.name,
          mode: 'insensitive',
        },
      },
    };
  }
  static async getSkills(filters) {
    const skills = await prisma.skill.findMany({
      ...this.getFilteredSkills(filters),
    });

    return skills;
  }

  static async createSkill({ payload }) {
    const findOne = await prisma.skill.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (findOne) {
      throw new InvariantError('Skill already exists');
    }

    let imageUrl = undefined;

    if (payload?.image) {
      ({ secure_url: imageUrl } = await CloudinaryStorage.upload(
        payload.image,
        {
          folder: folderStorage.cloudinary.SKILL_ICON,
        }
      ));
    }

    const skill = await prisma.skill.create({
      data: {
        ...payload,
        image: imageUrl,
      },
    });

    return skill;
  }

  static async updateSkill({ id, payload }) {
    return await prisma.$transaction(async (tx) => {
      const skill = await tx.skill.findUnique({
        where: {
          id,
        },
      });

      if (!skill) {
        throw new NotFoundError('Skill not found');
      }

      let imageUrl = undefined;

      if (payload?.image) {
        ({ secure_url: imageUrl } = await CloudinaryStorage.upload(
          payload.image,
          {
            folder: folderStorage.cloudinary.SKILL_ICON,
          }
        ));
      }

      const updatedSkill = await tx.skill.upsert({
        where: {
          id,
        },

        update: {
          ...payload,
          image: imageUrl,
        },

        create: {
          ...payload,
          image: imageUrl,
        },
      });

      return updatedSkill;
    });
  }

  static async deleteSkill(id) {
    return await prisma.$transaction(async (tx) => {
      const findOne = await prisma.skill.findUnique({
        where: {
          id,
        },
      });

      if (!findOne) {
        throw new NotFoundError('Skill not found');
      }

      const projects = await tx.projectSkill.findMany({
        where: {
          skillId: id,
        },
      });

      if (!projects) {
        throw new InvariantError('Skill cannot be deleted');
      }

      await tx.projectSkill.deleteMany({
        where: {
          id: projects.id,
          skillId: id,
        },
      });

      await tx.skill.delete({
        where: {
          id,
        },
      });
    });
  }
}

module.exports = SkillService;
