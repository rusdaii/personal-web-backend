const prisma = require('../lib/prisma');

const NotFoundError = require('../exeptions/NotFoundError');
const CloudinaryStorage = require('../lib/cloudinary/CloudinaryStorage');
const folderStorage = require('../constants/folderStorage');

class ProjectService {
  static projectMapping = (project) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      image: project.image,
      demo: project.demo,
      github: project.github,
      skills: project.skills.map((skill) => {
        return {
          id: skill.Skill.id,
          name: skill.Skill.name,
        };
      }),
    };
  };

  static async getProjects() {
    const projects = await prisma.project.findMany({
      include: {
        skills: {
          select: {
            Skill: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const result = projects.map((project) => this.projectMapping(project));

    return result;
  }

  static async createProject({ payload }) {
    return await prisma.$transaction(
      async (tx) => {
        const skills = await Promise.all(
          payload.skills.map(async (skill) => {
            return await tx.skill.upsert({
              where: {
                name: skill,
              },

              create: {
                name: skill,
              },
              update: {},
            });
          })
        );

        let imageUrl = undefined;

        if (payload?.image) {
          ({ secure_url: imageUrl } = await CloudinaryStorage.upload(
            payload.image,
            {
              folder: folderStorage.cloudinary.PROJECT_IMAGE,
            }
          ));
        }

        const newProject = await tx.project.create({
          data: {
            name: payload.name,
            description: payload.description,
            image: imageUrl,
            demo: payload.demo,
            github: payload.github,
          },
        });

        await tx.projectSkill.createMany({
          data: skills.map((skill) => ({
            projectId: newProject.id,
            skillId: skill.id,
          })),
        });

        return newProject;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
  }

  static async updateProject({ id, payload }) {
    return await prisma.$transaction(
      async (tx) => {
        const project = await tx.project.findFirst({
          where: {
            id,
          },
        });

        if (!project) {
          throw new NotFoundError('Project not found');
        }

        await tx.projectSkill.deleteMany({
          where: {
            projectId: project.id,
          },
        });

        const skills = await Promise.all(
          payload.skills.map(async (skill) => {
            return await tx.skill.upsert({
              where: {
                name: skill,
              },
              update: {},
              create: {
                name: skill,
              },
            });
          })
        );

        await tx.projectSkill.createMany({
          data: skills.map((skill) => ({
            projectId: project.id,
            skillId: skill.id,
          })),
        });

        let imageUrl = undefined;

        if (payload?.image) {
          ({ secure_url: imageUrl } = await CloudinaryStorage.upload(
            payload.image,
            {
              folder: folderStorage.cloudinary.PROJECT_IMAGE,
            }
          ));
        }

        const updatedProject = await tx.project.update({
          where: {
            id,
          },
          data: {
            name: payload.name,
            description: payload.description,
            demo: payload.demo,
            github: payload.github,
            image: imageUrl,
          },
          include: {
            skills: {
              include: {
                Skill: true,
              },
            },
          },
        });

        return this.projectMapping(updatedProject);
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
  }

  static async deleteProject(id) {
    const projectExists = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectExists) {
      throw new NotFoundError('Project not found');
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return;
  }
}

module.exports = ProjectService;
