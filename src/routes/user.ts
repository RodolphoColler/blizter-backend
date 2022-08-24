import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import validateUser from '../middlewares/validateUser';
import * as controllers from '../controllers/userController';

const router = Router();

const client = new OAuth2Client('100199167052-19lork61n9cr47i04m6n8230juu4hvos.apps.googleusercontent.com');

router.post('/social', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return;
  console.log(JSON.parse(authorization));

  const ticket = await client.verifyIdToken({
    idToken: authorization,
    audience: '100199167052-19lork61n9cr47i04m6n8230juu4hvos.apps.googleusercontent.com',
  });

  // const token = jwt.decode(authorization, { complete: true });

  console.log(ticket);

  res.status(201).json({ ticket });
});

router.post('/', validateUser, controllers.create);

export default router;
