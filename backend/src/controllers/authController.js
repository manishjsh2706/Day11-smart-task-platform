const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ======================
// Register User
// ======================

const registerUser = async (req, res) => {

 try {

   const {
     name,
     email,
     password,
     role
   } = req.body;

   // Check Existing User

   const existingUser = await User.findOne({
     email
   });

   if (existingUser) {

     return res.status(400).json({
       success: false,
       message: "User already exists"
     });

   }

   // Hash Password

   const hashedPassword =
     await bcrypt.hash(password, 10);

   const user = await User.create({

     name,

     email,

     password: hashedPassword,

     role: role || "user"

   });

   res.status(201).json({

     success: true,

     message: "User Registered Successfully",

     data: {
       id: user._id,
       name: user.name,
       email: user.email,
       role: user.role
     }

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({
     success: false,
     message: "Server Error"
   });

 }
};

// ======================
// Login User
// ======================

const loginUser = async (req, res) => {

 try {

   const {
     email,
     password
   } = req.body;

   const user =
     await User.findOne({ email });

   if (!user) {

     return res.status(401).json({
       success: false,
       message: "Invalid Credentials"
     });

   }

   const isMatch =
     await bcrypt.compare(
       password,
       user.password
     );

   if (!isMatch) {

     return res.status(401).json({
       success: false,
       message: "Invalid Credentials"
     });

   }

   const token =
     jwt.sign(
       {
         id: user._id,
         role: user.role
       },
       process.env.JWT_SECRET,
       {
         expiresIn: "1d"
       }
     );

   res.status(200).json({

     success: true,

     message: "Login Successful",

     token,

     user: {

       id: user._id,

       name: user.name,

       email: user.email,

       role: user.role

     }

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({
     success: false,
     message: "Server Error"
   });

 }
};

const getProfile = async (
 req,
 res
) => {

 try {

   const user =
     await User.findById(
       req.user.id
     ).select("-password");

   res.status(200).json({

     success: true,

     data: user

   });

 } catch (error) {

   res.status(500).json({
     success: false,
     message: "Server Error"
   });
 }
};


module.exports = {

 registerUser,

 loginUser,
 getProfile

};

