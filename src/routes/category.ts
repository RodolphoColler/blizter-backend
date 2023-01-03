import { Router } from 'express';
import * as controllers from '../controllers/categoryController';
// import validateToken from '../middlewares/validateToken';

const router = Router();

router.get('/', controllers.read);

export default router;
