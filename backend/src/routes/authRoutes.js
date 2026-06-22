const express = require("express");

const {
 registerUser,
 loginUser,
 getProfile

} = require("../controllers/authController");

const {
 body
} = require("express-validator");

const validationMiddleware =
require("../middleware/validationMiddleware");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");



// Register

router.post(

 "/register",

 [
   body("name").notEmpty(),

   body("email").isEmail(),

   body("password")
     .isLength({ min: 6 })
 ],

 validationMiddleware,

 registerUser

);


// Login

router.post(

 "/login",

 [
   body("email").isEmail(),

   body("password").notEmpty()
 ],

 validationMiddleware,

 loginUser

);

router.get(

 "/profile",

 authMiddleware,

 getProfile

);


module.exports = router;
