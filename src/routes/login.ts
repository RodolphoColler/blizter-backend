import { Router } from 'express';
import * as controllers from '../controllers/loginController';

const router = Router();

router.post('/', controllers.validate);

export default router;
