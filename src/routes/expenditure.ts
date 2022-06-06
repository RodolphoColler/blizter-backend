import { Router } from 'express';
import * as controllers from '../controllers/expenditureController';
import validateExpenditure from '../middlewares/validateExpenditure';

const router = Router();

router.post('/', validateExpenditure, controllers.create);

export default router;
