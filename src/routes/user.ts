import { Router } from 'express';
import validateUser from '../middlewares/validateUser';
import * as controller from '../controllers/userController';

const router = Router();

router.post('/', validateUser, controller.create);

export default router;
