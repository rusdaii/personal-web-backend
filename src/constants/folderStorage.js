const storage = process.env.CLOUDINARY_STORAGE;

console.log(storage);

exports.cloudinary = {
  AVATAR: `/${storage}/avatar`,
  SKILL_ICON: `/${storage}/skill-icons`,
  PROJECT_IMAGE: `/${storage}/project-images`,
};

exports.firebaseStorage = {
  RESUME: '/personal-web',
};
