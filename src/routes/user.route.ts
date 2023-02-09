import { Router, IRouter } from 'express';
import { register } from '../controllers/user.controller';

const router: IRouter = Router();

router.post('/register', register);

export default router;
