import { Router, IRouter } from 'express';
import passport from 'passport';
import * as auth from '../controllers/auth.controller';

const router: IRouter = Router();

router.post('/auth/local', auth.local);

// github authentication.
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', auth.oauth);

// google authentication.
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/auth/google/callback', auth.oauth);

export default router;
