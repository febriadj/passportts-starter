import { Router, IRouter } from 'express';
import UserRoute from './user.route';

const router: IRouter = Router();

router.use(UserRoute);

export default router;
