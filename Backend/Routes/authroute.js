import express from 'express';
import { signupf, loginf, logoutf } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', loginf);
router.post('/logout', logoutf);
router.post('/signup', signupf);

export default router;