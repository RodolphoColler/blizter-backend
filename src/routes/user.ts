import { Router } from 'express';
import validateUser from '../middlewares/validateUser';
import * as controller from '../controllers/userController';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/category', validateToken, controller.updateCategory);

router.post('/', validateUser, controller.create);

export default router;
