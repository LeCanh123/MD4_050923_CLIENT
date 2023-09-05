import { Request,Response } from "express";
//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entiey';
//Send mail
import MailService from "./../services/mail/index"
//template ejs email send
import genEmailString from '../services/template/emailConfirm';
//jwt mã hoá token
import jsonWeb1 from "./../services/jwt/index"
//tạo vs giải mã mật khẩu bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//



export interface UserType{
  username:string;
  email:string;
  emailconfirm:string;
  firstname:string;
  lastname:string;
  password:string;
  avatar:string;
  createat:Date;
  block:string;
}




let connection: Connection;
(async () => {
    try {
      connection = await createConnection({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'md4_db',
        entities: [User,Product,ProductImage,Bag,Cart,Category],
        synchronize: true,
      });
    } catch (error) {
      console.log('Database connection error:');
    }
  })();

  export default  {
    confirmTokenLogin: async function(req:Request, res:Response) {
      //giải nén token
      console.log(req.body);
      try{
        let ResultUser:any=jsonWeb1.verifyToken(req.body.token)
        console.log("ResultUser,",ResultUser);
      }
      catch(err){
        console.log("lỗi confirmTokenLogin use.middleware");
      }
     },
    }