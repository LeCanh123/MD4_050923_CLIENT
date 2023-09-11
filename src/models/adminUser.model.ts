//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entity';

//kết nối connection database
import { connection } from '../entity/connectionDatabase';
import { In } from 'typeorm';

//jwt
import jsonWeb1 from "../services/jwt/index"




  export default  {
    //category
    getListUser: async (data:any) => {
        try {
          const userRepository = connection.getRepository(User);
          let findUser=await userRepository.find();
          return {
            status:true,
            message:"Lấy danh sách user thành công",
            data:findUser
          }
        } catch (err:any) {
          return {
            status:true,
            message:"Lấy danh sách user thất bại",
            data:[]
          }
        }
    },
    getListUserCart: async (data:any) => {
      try {
        const userRepository = connection.getRepository(Bag);
        let findUserCart=await userRepository.find({ relations: ['user',"carts","address","carts.products","carts.products.productimage"] });
        return {
          status:true,
          message:"Lấy danh sách cart user thành công",
          data:findUserCart
        }
      } catch (err:any) {
        return {
          status:true,
          message:"Lấy danh sách user cart thất bại",
          data:[]
        }
      }
    },

}