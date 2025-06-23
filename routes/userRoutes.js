const express = require("express");
const router = express.Router();
 const {registerUser , loginUser} = require("../controllers/userController");
 const { body } = require("express-validator");

 router.post('/register' ,
    [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('password', 'Password must be 6+ chars').isLength({ min: 6 })
  ],
    registerUser);
    
 router.post('/login',loginUser);

 module.exports = router;