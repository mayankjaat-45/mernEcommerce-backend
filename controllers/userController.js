import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        // ✅ First safely log the raw body
        console.log("Request body:", req.body);

        // ✅ Validate inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // ✅ Only destructure AFTER validation check
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


export const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const userExist = await User.findOne({email});
            if(!userExist){
                 return res.status(400).json({message: "Invalid Credentials"});}

            const isMatch = await bcrypt.compare(password , userExist.password);
            if(!isMatch){
                 return res.status(400).json({message: "Invalid Credentials"})};

            const token = jwt.sign({ id:userExist._id }, process.env.JWT_SECRET, {expiresIn: "1d"});
                res.json({token, user :{
                    name: userExist.name,
                    email: userExist.email
                }});
    } catch (error) {
        res.status(500).json({message : "Login Faild", error})
    }
}