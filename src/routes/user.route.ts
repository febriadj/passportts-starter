import { Router, IRouter } from 'express';
import * as user from '../controllers/user.controller';

const router: IRouter = Router();

router.post('/register', user.register);

export default router;
