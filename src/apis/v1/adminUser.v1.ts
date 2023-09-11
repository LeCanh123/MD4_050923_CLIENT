import express  from "express";
import adminUserController from "../../controllers/adminUser.controller";
import multer from "multer";
import adminMiddlewave from "../../middlewave/admin.middlewave";

const router = express.Router();
router.post("/getlistuser",adminMiddlewave.confirmAdmin, adminUserController.getListUser);
router.post("/getlistusercart",adminMiddlewave.confirmAdmin, adminUserController.getListUserCart);
// router.post("/getlistusercart", adminUserController.getListUserCart);








export default router;