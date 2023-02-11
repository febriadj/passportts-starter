import { Router, IRouter } from 'express';
import UserRoute from './user.route';
import AuthRoute from './auth.route';

const router: IRouter = Router();

router.use(UserRoute);
router.use(AuthRoute);

export default router;
