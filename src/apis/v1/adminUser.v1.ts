import express  from "express";
import adminUserController from "../../controllers/adminUser.controller";
import multer from "multer";
import adminMiddlewave from "../../middlewave/admin.middlewave";

const router = express.Router();
router.post("/getlistuser",adminMiddlewave.confirmAdmin, adminUserController.getListUser);








export default router;