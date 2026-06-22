Lab 02: Week 02 Assessment Project
Part 1 – Backend Foundation.
Step 1 – Create Project
Open VS Code Terminal.
mkdir smart-task-platform

cd smart-task-platform

mkdir backend

cd backend
Step 2 – Initialize Project
npm init -y
Generated:
backend
│
└── package.json
Step 3 – Install Dependencies
Runtime Dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan express-validator
Development Dependencies
npm install -D nodemon

Step 4 – Update package.json
Replace entire package.json
package.json
{
 "name": "smart-task-backend",
 "version": "1.0.0",
 "description": "Smart Task Management Backend",
 "main": "src/server.js",
 "scripts": {
   "start": "node src/server.js",
   "dev": "nodemon src/server.js"
 },
 "keywords": [],
 "author": "Training Lab",
 "license": "ISC",
 "dependencies": {
   "bcryptjs": "^3.0.2",
   "cors": "^2.8.5",
   "dotenv": "^16.5.0",
   "express": "^5.1.0",
   "express-validator": "^7.2.1",
   "helmet": "^8.1.0",
   "jsonwebtoken": "^9.0.2",
   "mongoose": "^8.15.1",
   "morgan": "^1.10.0"
 },
 "devDependencies": {
   "nodemon": "^3.1.10"
 }
}
Step 5 – Create Folder Structure
Create folders.
mkdir src

cd src

mkdir config
mkdir controllers
mkdir middleware
mkdir models
mkdir routes
mkdir services
Return to backend folder.
Create files.
Final structure:
backend
│
├── src
│   │
│   ├── config
│   │     mongo.js
│   │
│   ├── controllers
│   │
│   ├── middleware
│   │     authMiddleware.js
│   │     roleMiddleware.js
│   │
│   ├── models
│   │     User.js
│   │     Task.js
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
└── package.json
Step 6 – Create .gitignore
.gitignore
node_modules

.env
coverage
dist
build
Step 7 – Create Environment Variables
.env
Replace Mongo URL with your Atlas URL.
PORT=5000

MONGO_URI=mongodb+srv://adminuser:Password123@cluster0.xxxxx.mongodb.net/smarttaskdb

JWT_SECRET=myverylongjwtsecretkey

COGNITO_REGION=ap-south-1

COGNITO_USER_POOL_ID=

COGNITO_CLIENT_ID=
Step 8 – MongoDB Connection
Create:
src/config/mongo.js
mongo.js
const mongoose = require("mongoose");

const connectDB = async () => {
 try {

   await mongoose.connect(process.env.MONGO_URI);

   console.log("MongoDB Connected Successfully");

 } catch (error) {

   console.error("MongoDB Connection Failed");

   console.error(error.message);

   process.exit(1);
 }
};

module.exports = connectDB;
Step 9 – User Model
Create:
src/models/User.js
User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
 {
   name: {
     type: String,
     required: [true, "Name is required"],
     trim: true
   },

   email: {
     type: String,
     required: [true, "Email is required"],
     unique: true,
     lowercase: true
   },

   password: {
     type: String,
     required: [true, "Password is required"]
   },

   role: {
     type: String,
     enum: ["admin", "user"],
     default: "user"
   }
 },
 {
   timestamps: true
 }
);

module.exports = mongoose.model("User", userSchema);

Step 10 – Task Model
Create:
src/models/Task.js
Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
 {
   title: {
     type: String,
     required: [true, "Task title required"],
     trim: true
   },

   description: {
     type: String,
     default: ""
   },

   status: {
     type: String,
     enum: [
       "Pending",
       "In Progress",
       "Completed"
     ],
     default: "Pending"
   },

   priority: {
     type: String,
     enum: [
       "Low",
       "Medium",
       "High"
     ],
     default: "Medium"
   },

   assignedUser: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true
   }
 },
 {
   timestamps: true
 }
);

module.exports = mongoose.model("Task", taskSchema);
Step 11 – Authentication Middleware
Create:
src/middleware/authMiddleware.js
authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = async (
 req,
 res,
 next
) => {

 try {

   const authHeader =
     req.headers.authorization;

   if (!authHeader) {

     return res.status(401).json({
       success: false,
       message: "Token missing"
     });
   }

   const token =
     authHeader.split(" ")[1];

   const decoded =
     jwt.verify(
       token,
       process.env.JWT_SECRET
     );

   req.user = decoded;

   next();

 } catch (error) {

   return res.status(401).json({
     success: false,
     message: "Invalid Token"
   });
 }
};

module.exports = authMiddleware;
Step 12 – Role Middleware
Create:
src/middleware/roleMiddleware.js
roleMiddleware.js
const roleMiddleware = (...roles) => {

 return (req, res, next) => {

   if (!roles.includes(req.user.role)) {

     return res.status(403).json({
       success: false,
       message: "Access Denied"
     });
   }

   next();
 };
};

module.exports = roleMiddleware;
Step 13 – Express Application
Create:
src/app.js
app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {

 res.json({
   success: true,
   message:
     "Smart Task Management API Running"
 });
});

module.exports = app;
Step 14 – Server Entry Point
Create:
src/server.js
server.js
require("dotenv").config();

const app = require("./app");

const connectDB =
 require("./config/mongo");

const PORT =
 process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {

 console.log(
   `Server Running On Port ${PORT}`
 );
});
Step 15 – Start Backend
Run:
npm run dev
Expected Output
MongoDB Connected Successfully

Server Running On Port 5000
Step 16 – Test API
Open Browser:
http://localhost:5000
Expected
{
 "success": true,
 "message": "Smart Task Management API Running"
}
Step 17 – Verify Atlas Data
Open MongoDB Compass.
Connection String:
mongodb+srv://adminuser:Password123@cluster0.xxxxx.mongodb.net
Connect successfully.
Database:
smarttaskdb
Collections will appear once records are inserted in Part 2.


Part 2 – Authentication Module 
Step 1 – Create Authentication Controller
Create file:
src/controllers/authController.js
authController.js
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

module.exports = {

 registerUser,

 loginUser

};

Step 2 – Create Auth Routes
Create:
src/routes/authRoutes.js
authRoutes.js
const express = require("express");

const {
 registerUser,
 loginUser
} = require("../controllers/authController");

const {
 body
} = require("express-validator");

const router = express.Router();


// ====================
// Register Route
// ====================

router.post(

 "/register",

 [
   body("name")
     .notEmpty()
     .withMessage("Name Required"),

   body("email")
     .isEmail()
     .withMessage("Valid Email Required"),

   body("password")
     .isLength({ min: 6 })
     .withMessage(
       "Password must be minimum 6 characters"
     )
 ],

 registerUser

);


// ====================
// Login Route
// ====================

router.post(

 "/login",

 [
   body("email")
     .isEmail(),

   body("password")
     .notEmpty()
 ],

 loginUser

);

module.exports = router;
Step 3 – Add Validation Middleware
Create:
src/middleware/validationMiddleware.js
validationMiddleware.js
const {
 validationResult
} = require("express-validator");

const validationMiddleware = (
 req,
 res,
 next
) => {

 const errors =
   validationResult(req);

 if (!errors.isEmpty()) {

   return res.status(400).json({

     success: false,

     errors: errors.array()

   });

 }

 next();
};

module.exports =
 validationMiddleware;
Step 4 – Update Auth Routes
Replace authRoutes.js completely with this version.
const express = require("express");

const {
 registerUser,
 loginUser
} = require("../controllers/authController");

const {
 body
} = require("express-validator");

const validationMiddleware =
require("../middleware/validationMiddleware");

const router = express.Router();


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

module.exports = router;
Step 5 – Create User Profile API
Add below function to authController.js
Place after loginUser.
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
Update Exports
At bottom replace module.exports.
module.exports = {

 registerUser,

 loginUser,

 getProfile

};
Step 6 – Add Profile Route
Update authRoutes.js
Add imports.
const authMiddleware =
require("../middleware/authMiddleware");
Update controller import.
const {

 registerUser,

 loginUser,

 getProfile

} = require("../controllers/authController");
Add route before module.exports.
router.get(

 "/profile",

 authMiddleware,

 getProfile

);
Step 7 – Register Routes in App
Open:
src/app.js
Replace file.
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));


// Routes

app.use(
 "/api/auth",
 authRoutes
);


// Health Check

app.get("/", (req, res) => {

 res.json({

   success: true,

   message:
     "Smart Task API Running"

 });

});

module.exports = app;
Step 8 – Start Application
npm run dev
Expected:
MongoDB Connected Successfully

Server Running On Port 5000
Step 9 – Test Registration API
Open Postman.
Request
POST http://localhost:5000/api/auth/register
Headers
Content-Type: application/json
Body
{
 "name":"Admin User",
 "email":"admin@test.com",
 "password":"password123",
 "role":"admin"
}
Expected Response
{
 "success": true,
 "message": "User Registered Successfully",
 "data": {
   "id": "xxxx",
   "name": "Admin User",
   "email": "admin@test.com",
   "role": "admin"
 }
}
Step 10 – Verify Password Hashing
Open MongoDB Compass.
Collection:
users
Example Record
{
 "_id":"...",
 "name":"Admin User",
 "email":"admin@test.com",
 "password":"$2b$10$M9Q....",
 "role":"admin"
}
Password should NOT be visible in plain text.


Step 11 – Create Standard User
Request
POST http://localhost:5000/api/auth/register
Body
{
 "name":"John User",
 "email":"john@test.com",
 "password":"password123"
}
Role automatically becomes:
"user"
Step 12 – Test Login
Request
POST http://localhost:5000/api/auth/login
Body
{
 "email":"admin@test.com",
 "password":"password123"
}
Expected Response
{
 "success": true,
 "message": "Login Successful",
 "token": "eyJhbGc...",
 "user": {
   "id":"...",
   "name":"Admin User",
   "email":"admin@test.com",
   "role":"admin"
 }
}

Step 13 – Copy JWT Token
Example:
eyJhbGc...
Save it.
Used in every protected API.
Step 14 – Test Profile API
Request
GET http://localhost:5000/api/auth/profile
Headers
Authorization

Bearer JWT_TOKEN
Expected Response
{
 "success": true,
 "data": {
   "_id":"...",
   "name":"Admin User",
   "email":"admin@test.com",
   "role":"admin"
 }
}
Step 15 – Invalid Login Test
{
 "email":"admin@test.com",
 "password":"wrongpassword"
}
Expected:
{
 "success": false,
 "message": "Invalid Credentials"
}

Step 16 – Missing Token Test
Request
GET /api/auth/profile
No Authorization Header.
Expected:
{
 "success": false,
 "message": "Token missing"
}
Current API List
Public
POST /api/auth/register

POST /api/auth/login
Protected
GET /api/auth/profile


Lab 02 : Part 3 – Task Management
Step 1 – Verify Current User Schema
Open:
src/models/User.js
No changes required.
Step 2 – Update Task Schema
Open:
src/models/Task.js
Replace with:
src/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
 {
   title: {
     type: String,
     required: [true, "Title required"],
     trim: true
   },

   description: {
     type: String,
     default: ""
   },

   status: {
     type: String,
     enum: [
       "Pending",
       "In Progress",
       "Completed"
     ],
     default: "Pending"
   },

   priority: {
     type: String,
     enum: [
       "Low",
       "Medium",
       "High"
     ],
     default: "Medium"
   },

   assignedUser: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true
   },

   createdBy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true
   }

 },
 {
   timestamps: true
 }
);

module.exports = mongoose.model(
 "Task",
 taskSchema
);
Step 3 – Create Task Controller
Create file:
src/controllers/taskController.js
Complete taskController.js
const Task = require("../models/Task");
const User = require("../models/User");


// ======================================
// Create Task
// ======================================

const createTask = async (
 req,
 res
) => {

 try {

   const {
     title,
     description,
     priority,
     assignedUser
   } = req.body;

   const userExists =
     await User.findById(
       assignedUser
     );

   if (!userExists) {

     return res.status(404).json({
       success: false,
       message: "Assigned user not found"
     });

   }

   const task =
     await Task.create({

       title,

       description,

       priority,

       assignedUser,

       createdBy: req.user.id

     });

   res.status(201).json({

     success: true,

     message: "Task Created",

     data: task

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Get Tasks
// ======================================

const getTasks = async (
 req,
 res
) => {

 try {

   let tasks;

   if (
     req.user.role === "admin"
   ) {

     tasks =
       await Task.find()

         .populate(
           "assignedUser",
           "name email role"
         )

         .populate(
           "createdBy",
           "name email role"
         );

   } else {

     tasks =
       await Task.find({
         assignedUser:
           req.user.id
       })

         .populate(
           "assignedUser",
           "name email role"
         )

         .populate(
           "createdBy",
           "name email role"
         );

   }

   res.status(200).json({

     success: true,

     count: tasks.length,

     data: tasks

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Get Single Task
// ======================================

const getTaskById = async (
 req,
 res
) => {

 try {

   const task =
     await Task.findById(
       req.params.id
     )

       .populate(
         "assignedUser",
         "name email role"
       )

       .populate(
         "createdBy",
         "name email role"
       );

   if (!task) {

     return res.status(404).json({

       success: false,

       message: "Task not found"

     });

   }

   if (
     req.user.role !== "admin" &&
     task.assignedUser._id.toString() !==
     req.user.id
   ) {

     return res.status(403).json({

       success: false,

       message: "Access Denied"

     });

   }

   res.status(200).json({

     success: true,

     data: task

   });

 } catch (error) {

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Update Task
// ======================================

const updateTask = async (
 req,
 res
) => {

 try {

   const task =
     await Task.findById(
       req.params.id
     );

   if (!task) {

     return res.status(404).json({

       success: false,

       message: "Task not found"

     });

   }

   if (
     req.user.role !== "admin" &&
     task.assignedUser.toString() !==
     req.user.id
   ) {

     return res.status(403).json({

       success: false,

       message: "Access Denied"

     });

   }

   const updatedTask =
     await Task.findByIdAndUpdate(

       req.params.id,

       req.body,

       {
         new: true,
         runValidators: true
       }

     );

   res.status(200).json({

     success: true,

     message: "Task Updated",

     data: updatedTask

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};



// ======================================
// Delete Task
// ======================================

const deleteTask = async (
 req,
 res
) => {

 try {

   const task =
     await Task.findById(
       req.params.id
     );

   if (!task) {

     return res.status(404).json({

       success: false,

       message: "Task not found"

     });

   }

   if (
     req.user.role !== "admin"
   ) {

     return res.status(403).json({

       success: false,

       message:
         "Only Admin can delete tasks"

     });

   }

   await task.deleteOne();

   res.status(200).json({

     success: true,

     message:
       "Task Deleted Successfully"

   });

 } catch (error) {

   console.error(error);

   res.status(500).json({

     success: false,

     message: "Server Error"

   });

 }

};

module.exports = {

 createTask,

 getTasks,

 getTaskById,

 updateTask,

 deleteTask

};
Step 4 – Create Task Routes
Create:
src/routes/taskRoutes.js
Complete taskRoutes.js
const express = require("express");

const router =
 express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

 createTask,

 getTasks,

 getTaskById,

 updateTask,

 deleteTask

} =
require("../controllers/taskController");



// Create Task

router.post(
 "/",
 authMiddleware,
 createTask
);


// Get All Tasks

router.get(
 "/",
 authMiddleware,
 getTasks
);


// Get Single Task

router.get(
 "/:id",
 authMiddleware,
 getTaskById
);


// Update Task

router.put(
 "/:id",
 authMiddleware,
 updateTask
);


// Delete Task

router.delete(
 "/:id",
 authMiddleware,
 deleteTask
);

module.exports = router;
Step 5 – Register Routes
Open:
src/app.js
Add import:
const taskRoutes =
require("./routes/taskRoutes");
Add route registration:
app.use(
 "/api/tasks",
 taskRoutes
);
Final route section:
app.use(
 "/api/auth",
 authRoutes
);

app.use(
 "/api/tasks",
 taskRoutes
);
Step 6 – Restart Server
npm run dev
Expected:
MongoDB Connected Successfully

Server Running On Port 5000
Step 7 – Create Test Users
Already created in Part 2.
Admin:
{
 "email":"admin@test.com",
 "password":"password123"
}
User:
{
 "email":"john@test.com",
 "password":"password123"
}
Step 8 – Login as Admin
POST
/api/auth/login
Copy token.
Step 9 – Find User ID
Login as user.
POST
/api/auth/login
Response:
{
 "user":{
   "id":"6844f8..."
 }
}
Copy ID.
Step 10 – Create Task
POST http://localhost:5000/api/tasks
Headers:
Authorization

Bearer ADMIN_TOKEN
Body:
{
 "title":"Deploy Application",
 "description":"Deploy React App to S3",
 "priority":"High",
 "assignedUser":"USER_ID"
}
Expected:
{
 "success":true,
 "message":"Task Created"
}
Step 11 – Admin View Tasks
GET
/api/tasks
Header:
Bearer ADMIN_TOKEN
Expected:
{
 "count":1,
 "data":[]
}
Admin sees:
All Tasks
Step 12 – User View Tasks
Login as user.
Use USER_TOKEN.
GET
/api/tasks
Expected:
Only assigned tasks
User cannot see everyone else's tasks.
Step 13 – Get Single Task
GET
/api/tasks/{taskId}
Response:
{
 "success":true,
 "data":{
   "title":"Deploy Application"
 }
}
Step 14 – Update Task
PUT
/api/tasks/{taskId}
Body:
{
 "status":"Completed"
}
Expected:
{
 "message":"Task Updated"
}
Step 15 – Delete Task
Admin Only
DELETE
/api/tasks/{taskId}
Expected:
{
 "message":"Task Deleted Successfully"
}

Step 16 – RBAC Verification
User Delete Attempt
DELETE
/api/tasks/{taskId}
Response:
{
 "success":false,
 "message":"Only Admin can delete tasks"
}
Step 17 – Verify MongoDB
Collection:
tasks
Example:
{
 "_id":"...",
 "title":"Deploy Application",
 "description":"Deploy React App",
 "status":"Pending",
 "priority":"High",
 "assignedUser":"...",
 "createdBy":"...",
 "createdAt":"...",
 "updatedAt":"..."
}


