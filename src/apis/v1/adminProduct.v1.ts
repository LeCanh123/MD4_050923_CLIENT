import express  from "express";
import adminProductController from "../../controllers/adminProduct.controller";
import multer from "multer";


const router = express.Router();
router.post("/addcategory", adminProductController.addCategory);
router.post("/getcategory", adminProductController.getCategory);
router.post("/deletecategory", adminProductController.deleteCategory);
router.post("/productgetcategory", adminProductController.productGetCategory);
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
router.post("/getproduct", adminProductController.getProduct);
router.post("/deleteproduct", adminProductController.deleteProduct);
router.post("/editproduct", adminProductController.editProduct);



export default router;