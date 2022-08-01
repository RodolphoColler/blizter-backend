import { Router } from 'express';
import validateUser from '../middlewares/validateUser';
import * as controllers from '../controllers/userController';

const router = Router();

router.post('/', validateUser, controllers.create);

export default router;
