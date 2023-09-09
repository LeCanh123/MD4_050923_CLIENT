import express  from "express";
import purchaseController from "../../controllers/purchase.controller";


const router = express.Router();
// http://localhost:4000/apis/v1/purchase/addorder/

router.post("/addorder", purchaseController.addOrder);
router.post("/gethistory", purchaseController.getHistory);




export default router;