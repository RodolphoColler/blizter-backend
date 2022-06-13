import { Router } from 'express';
import validateUser from '../middlewares/validateUser';
import * as controller from '../controllers/userController';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.patch('/category/:id', validateToken, controller.updateCategory);

router.post('/', validateUser, controller.create);

router.get('/category/:id', validateToken, controller.readCategory);

export default router;
