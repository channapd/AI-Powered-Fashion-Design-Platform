import express from 'express'
import {deleteImage, generateImage} from '../controllers/imageController.js'
import userAuth from '../middleware/userAuth.js';

const imageRouter = express.Router();

imageRouter.post('/generate-image', userAuth, generateImage);
imageRouter.delete('/delete-image', userAuth, deleteImage)


export default imageRouter