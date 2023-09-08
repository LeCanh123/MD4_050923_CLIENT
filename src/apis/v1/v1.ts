import express  from "express";


const router = express.Router();

import userController from "./../../controllers/user.controller";
router.get("/user", userController.register);
// // router.post("/user", userController.addUser);
// router.post("/user/:id", userController.deleteUser);
// router.post("/confirmuser", userController.confirmUser);


export default router;