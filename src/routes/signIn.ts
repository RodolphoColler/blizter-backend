import { Router } from 'express';
import * as controllers from '../controllers/signInController';
import * as middlewares from '../middlewares/validateSignIn';

const router = Router();

router.post('/', middlewares.validate, controllers.validate);

export default router;
