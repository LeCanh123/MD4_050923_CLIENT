import express  from "express";


const router = express.Router();

import V1 from "./v1/v1";
router.use("/v1", V1);


router.get("/", (req, res) => {
    res.send("Hello from API");
  });

export default router;





