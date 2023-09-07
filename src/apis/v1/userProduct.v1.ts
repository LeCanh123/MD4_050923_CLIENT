import express  from "express";
import userGetProductController from "../../controllers/userGetProduct.controller";


const router = express.Router();
router.get("/getproduct", userGetProductController.getProduct);


export default router;