import { Router } from 'express';
import * as controllers from '../controllers/expenditureController';
import * as middlewares from '../middlewares/validateExpenditure';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.get('/:id', middlewares.read, validateToken, controllers.read);

router.post('/', middlewares.create, validateToken, controllers.create);

router.delete('/:id', controllers.deleteOne);

export default router;
