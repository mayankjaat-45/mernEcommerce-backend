import express from 'express'
const router = express.Router();
import {registerUser , loginUser} from "../controllers/userController.js";
import { body } from "express-validator";

 router.post('/register' ,
    [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('password', 'Password must be 6+ chars').isLength({ min: 6 })
  ],
    registerUser);
    
 router.post('/login',loginUser);

export default router;