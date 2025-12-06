const { Router } = require("express");
const { me, signin, signInByGoogle, signup, verifyUser } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signin/google', signInByGoogle);
router.get('/me', verifyToken, me);
router.get('/verify/:token', verifyUser);

module.exports = router;