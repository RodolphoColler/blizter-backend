import { Router } from 'express';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.get('/', validateToken, (req, res) => {
  const { tokenPayload: id } = req;

  return res.status(200).json(id);
});

export default router;
