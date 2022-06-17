import { Router } from 'express';
import * as middlewares from '../middlewares/validateSalary';
import * as controllers from '../controllers/salaryController';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/', middlewares.create, validateToken, controllers.create);

export default router;
