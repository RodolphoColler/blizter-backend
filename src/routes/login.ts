import { Router } from 'express';
import * as controllers from '../controllers/loginController';

const router = Router();

router.get('/', controllers.validate);

export default router;
