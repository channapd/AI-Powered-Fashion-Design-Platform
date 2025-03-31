import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, retrieveDesigns, userCredits } from '../controllers/userContoller.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/retrieve-designs', userAuth, retrieveDesigns);

export default userRouter;