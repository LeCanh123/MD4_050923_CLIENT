import express  from "express";


const router = express.Router();
//middleware
import userMiddlewave from "../../middlewave/user.middlewave";
//user controller
import userController from "./../../controllers/user.controller";
//user
router.get("/user", userController.getUser);
router.post("/user", userController.addUser);
router.post("/user/:id", userController.deleteUser);
router.get("/confirmuser/:token", userController.confirmUser);
router.post("/userlogin", userController.userLogin);
router.post("/usergetchangeinfo", userController.userGetChangeInfo);
router.post("/userchangeinfo", userController.userChangeInfo);
router.post("/userchangeconfirm", userController.userChangeConfirm);

//Add google user
router.post("/googleuser", userController.googleAddUser);

//user product
import userProduct from "./userProduct.v1"
router.use("/userproduct", userProduct);

//admin product
import adminProduct from "./adminProduct.v1"
router.use("/adminproduct", adminProduct);

//admin manage User
import adminUser from "./adminUser.v1"
router.use("/adminuser", adminUser);


//purchase
import Purchase1 from "./purchase.v1"
router.use("/purchase", Purchase1);


//middleware
router.post("/userchecktoken", userMiddlewave.confirmTokenLogin);

export default router;