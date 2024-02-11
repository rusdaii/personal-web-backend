const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const skillRoute = require('./api/routes/skill.route');
const projectRoute = require('./api/routes/project.route');
const userRoute = require('./api/routes/user.route');
const socialRoute = require('./api/routes/social.route');

router.use('/api/auth', authRoute);
router.use('/api/skills', skillRoute);
router.use('/api/projects', projectRoute);
router.use('/api/user', userRoute);
router.use('/api/socials', socialRoute);

module.exports = router;
