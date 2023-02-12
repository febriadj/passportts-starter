import { Router, IRouter } from 'express';
import passport from 'passport';
import * as auth from '../controllers/auth.controller';

const router: IRouter = Router();

router.post('/auth/local', auth.local);

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', auth.oauth);

export default router;
