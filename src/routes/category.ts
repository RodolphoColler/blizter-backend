import { Router } from 'express';
import * as controllers from '../controllers/categoryController';

const router = Router();

router.get('/', controllers.read);

export default router;
