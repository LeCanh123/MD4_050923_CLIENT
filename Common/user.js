/* Create Express Router */
import express from 'express'
const router = express.Router()
import multer from "multer";
import userController from '../../controllers/user.controller';
const imgProductStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product_${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
  })
  const productUpload = multer({ storage: imgProductStorage })


router.get('/confirm/:token', userController.confirm)
router.post('/login', userController.login)
router.post('/tokenlogin', userController.tokenlogin)
router.post('/adminlogin', userController.adminlogin)



router.get('/', userController.read)
router.get('/getcategory', userController.getcategory)
router.get('/getwomen', userController.getwomen)
router.get('/getmen', userController.getmen)
router.post('/', userController.create)
router.post('/getsinglecard', userController.getsinglecard)
router.post('/addtocart', userController.addtocart)
router.post('/getcart', userController.getcart)
router.post('/deleteuserproduct', userController.deleteuserproduct)
router.post('/addnewproduct', userController.addnewproduct)
router.get('/admingetmen', userController.admingetmen)
router.get('/admingetwomen', userController.admingetwomen)
router.get('/admingetuser', userController.admingetuser)
router.post('/admindeleteproduct', userController.admindeleteproduct)



router.post('/admineditproduct',
productUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'img1', maxCount: 1 },
{ name: 'img2', maxCount: 1 },{ name: 'img3', maxCount: 1 },{ name: 'img4', maxCount: 1 },

]),
 userController.admineditproduct)


 router.post('/adminaddproduct',
productUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'img1', maxCount: 1 },
{ name: 'img2', maxCount: 1 },{ name: 'img3', maxCount: 1 },{ name: 'img4', maxCount: 1 },

]),
 userController.adminaddproduct)

 router.post('/increaseproduct', userController.increaseproduct)
 

export default router;