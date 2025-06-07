import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { editUserData, getUserData, retrieveDesigns, userCredits } from '../controllers/userContoller.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/retrieve-designs', userAuth, retrieveDesigns);
userRouter.put('/update-user-details', userAuth, editUserData);

export default userRouter;