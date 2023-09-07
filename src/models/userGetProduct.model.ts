//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entity';


import { connection } from '../entity/connectionDatabase';


  export default  {
    getProduct: async () => {
        try {
          const userRepository = connection.getRepository(Product);
          const users = await userRepository.find({where:{
            category:{ id:2 }
          }});
          

          // const users = await userRepository.find({
          //   select: {email: true,password:true},
          // });

          return {
            status: true,
            messsage: "Get users success !",
            data: users
        }

          
        } catch (error) {
          console.log('Error getting users:', error);
          return {
            status: false,
            messsage: "Error getting users !",
        }
        }
    },

}