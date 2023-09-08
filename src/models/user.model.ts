import { createConnection, Connection } from 'typeorm';
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entiey';

//Prisma
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()





// let connection: Connection;
// (async () => {
//     try {
//       connection = await createConnection({
//         type: 'mysql',
//         host: '127.0.0.1',
//         port: 3306,
//         username: 'root',
//         password: '',
//         database: 'md4_db',
//         entities: [User,Product,ProductImage,Bag,Cart,Category],
//         synchronize: true,
//       });
//     } catch (error) {
//       console.log('Database connection error:', error);
//     }
//   })();


export interface address{
  province :string;
  // userId:string
}


export interface newUser {
email:string;
username:string;
password:string;
firstname:string;
lastname:string;
avatar:string;
address?:address[]
}



export default  {
register:async function(newUser:newUser){
  try{

    let newUser1={
      email:"string",
      username:"string",
      password:"string",
      firstname:"string",
      lastname:"string",
      avatar:"string",
      address:{create:{province:"1234"}}
}


      let user =await prisma.user.create({data:newUser})


      return {
        status:true,
        message:"Register thành công",
        data:user
      }

  }
  catch(err){
    console.log(err);
    
    return {
      status:false,
      message:"Register thất bại",
    
    }
  }
}
}


