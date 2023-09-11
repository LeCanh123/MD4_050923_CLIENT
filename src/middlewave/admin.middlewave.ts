import { Request,Response ,NextFunction} from "express";
//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entity';
//Send mail
import MailService from "../services/mail/index"
//template ejs email send
import genEmailString from '../services/template/emailConfirm';
//jwt mã hoá token
import jsonWeb1 from "../services/jwt/index"
//tạo vs giải mã mật khẩu bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;


//kết nối connection database
import { connection } from '../entity/connectionDatabase';
import { In } from 'typeorm';



  export default  {
    confirmAdmin: async function(req:Request, res:Response,next:NextFunction) {
      console.log("30...",req.body);
      
      //giải nén token

      try{
        let unpack:any= jsonWeb1.verifyToken(req.body.token);
        console.log("unpack",unpack);
        
        if(unpack.username=="admin"){
          next();
          return

        }else{
          return res.status(201).json({
            status:false,
            message:"Không phải admin",
            data:[]
          })
        }
      }
      catch(err){
       

        return res.status(201).json({
          status:false,
          message:"Chưa đăng nhập",
          data:[]
        })
      }
     },
    }