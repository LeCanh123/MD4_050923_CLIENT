import express  from "express";
import userGetProductController from "../../controllers/userGetProduct.controller";


const router = express.Router();
// http://localhost:4000/apis/v1/userproduct/getmenproduct/
router.get("/getmenproduct", userGetProductController.getMenProduct);
router.post("/addtocart", userGetProductController.addToCart);
router.post("/getcart", userGetProductController.getCart);
router.post("/deleteproduct", userGetProductController.deleteProduct);
router.post("/changequantity", userGetProductController.changeQuantity);
router.post("/getcategory", userGetProductController.getCategory);
router.post("/getproductbycategory", userGetProductController.getProductByCategory);



export default router;