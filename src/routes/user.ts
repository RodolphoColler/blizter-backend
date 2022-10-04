import { Router } from 'express';
import validateUser from '../middlewares/validateUser';
import * as controllers from '../controllers/userController';
import validateGoogleToken from '../middlewares/validateGoogleToken';

const router = Router();

router.post('/social', validateGoogleToken, controllers.createSocial);

router.post('/', validateUser, controllers.create);

export default router;
