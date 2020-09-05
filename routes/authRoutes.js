const {Router} = require('express');
const authController = require('../controllers/authController')
const router = Router();

router.post('/auth/login', authController.login_post)
router.post('/auth/signup', authController.signup_post)
router.get('/auth/logout', authController.logout_get)
router.get('/auth/checkUser',authController.checkuser_get)
router.get('/auth/requireAuth',authController.requireAuth_get)
module.exports = router;