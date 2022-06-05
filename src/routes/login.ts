import { Router } from 'express';
import * as controllers from '../controllers/loginController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

router.post('/', validateLogin, controllers.validate);

export default router;
