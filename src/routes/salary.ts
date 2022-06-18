import { Router } from 'express';
import * as middlewares from '../middlewares/validateSalary';
import * as controllers from '../controllers/salaryController';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/', middlewares.create, validateToken, controllers.create);

router.get('/:id', middlewares.readOne, validateToken, controllers.readOne);

router.patch('/:id', middlewares.updateOne, validateToken, controllers.updateOne);

export default router;
