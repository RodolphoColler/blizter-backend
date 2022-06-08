import { Router } from 'express';
import * as controllers from '../controllers/expenditureController';
import validateExpenditure from '../middlewares/validateExpenditure';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/', validateExpenditure, validateToken, controllers.create);

export default router;
