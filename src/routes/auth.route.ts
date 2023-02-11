import { Router, IRouter } from 'express';
import * as auth from '../controllers/auth.controller';

const router: IRouter = Router();

router.post('/auth/local', auth.local);

export default router;
