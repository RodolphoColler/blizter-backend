import { Router } from 'express';
import * as controllers from '../controllers/signInController';
import * as middlewares from '../middlewares/validateSignIn';
import validateGoogleToken from '../middlewares/validateGoogleToken';

const router = Router();

router.post('/social', validateGoogleToken, controllers.socialValidate);

router.post('/', middlewares.validate, controllers.validate);

export default router;
