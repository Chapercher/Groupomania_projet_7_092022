const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//user DB
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.delete('/:id', userController.deleteUser);

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;