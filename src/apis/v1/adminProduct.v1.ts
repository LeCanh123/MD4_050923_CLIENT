import express  from "express";
import adminProductController from "../../controllers/adminProduct.controller";
import multer from "multer";
import adminMiddlewave from "../../middlewave/admin.middlewave";

const router = express.Router();
router.post("/addcategory",adminMiddlewave.confirmAdmin, adminProductController.addCategory);
router.post("/getcategory",adminMiddlewave.confirmAdmin, adminProductController.getCategory);
router.post("/deletecategory",adminMiddlewave.confirmAdmin, adminProductController.deleteCategory);
router.post("/productgetcategory",adminMiddlewave.confirmAdmin, adminProductController.productGetCategory);
router.post("/test", adminProductController.test);



//firebase
const imgProductStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product_${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
  })
  const productUpload = multer({ storage: imgProductStorage })
//product
router.post('/addproduct',
productUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'img1', maxCount: 1 },
{ name: 'img2', maxCount: 1 },{ name: 'img3', maxCount: 1 },{ name: 'img4', maxCount: 1 },
]),
adminProductController.addProduct);
router.post("/getproduct",adminMiddlewave.confirmAdmin, adminProductController.getProduct);
router.post("/deleteproduct",adminMiddlewave.confirmAdmin, adminProductController.deleteProduct);
router.post("/editproduct",adminMiddlewave.confirmAdmin, adminProductController.editProduct);
router.post("/adminchecklogin",adminMiddlewave.confirmAdmin,adminProductController.adminCheckLogin);





export default router;