//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entity';
import { Address } from '../entity/address.entity';
//type orm
import { In } from 'typeorm';
import { connection } from '../entity/connectionDatabase';

//jwt
import jsonWeb1 from "./../services/jwt/index"

  export default  {

    addOrder: async (data:any) => {
      //giải mã token
      try{
        let unpack:any= jsonWeb1.verifyToken(data.token);
        console.log(unpack);
        if(unpack){
          const userCart = connection.getRepository(Cart);
          //tìm thông tin user
          const userRepository = connection.getRepository(User);
          let findUserChangeInfo=await userRepository.find({where:{username:unpack.username}});

          //tìm giỏ hàng
          const userBag = connection.getRepository(Bag);
          let findUserBag:any=await userBag.find({where:{user:unpack.id,block:"null"}});
          //nếu không thấy giỏ hàng
          if(findUserBag.length==0){
            //trả về lỗi
            return {
                status: false,
                message: "Giỏ hàng không tồn tại",
              }
          //nếu thấy giỏ hàng
          }else{
            //thêm địa chỉ vào giỏ hàng
            const userAddress = connection.getRepository(Address);
            let addOrderResult=await userAddress.save({...data.data,bag:findUserBag[0].id});

            //block giỏ hàng
            // let blockUserBag=userBag;
            let blockUserBag=await userBag
                .createQueryBuilder()
                .update(Bag)
                .set({ block: "true"})
                .where("id = :id", { id: findUserBag[0].id })
                .execute();

            return {
                status: true,
                message: "Tạo đơn hàng thành công",
              }

          }
        }
        return {
          status: false,
          message: "Chưa đăng nhập",
        }
      }
      catch(err){
        return {
          status: false,
          message: "add Order thất bại !",
          // data: null
              }
      }
    },
    getHistory: async (data:any) => {
        //giải mã token
        try{
          let unpack:any= jsonWeb1.verifyToken(data.token);
          console.log(unpack);
          if(unpack){
            const userCart = connection.getRepository(Cart);
            //tìm thông tin user
            const userRepository = connection.getRepository(User);
            let findUserChangeInfo=await userRepository.find({where:{username:unpack.username}});
  
            //tìm giỏ hàng
            const userBag = connection.getRepository(Bag);
            let findUserBag:any=await userBag.find({where:{user:unpack.id,block:"true"},relations: ['carts']});
            //nếu không thấy giỏ hàng
            if(findUserBag.length==0){
              //trả về lỗi
              return {
                  status: false,
                  message: "Chưa có đơn hàng",
                }
            //nếu thấy giỏ hàng
            }else{
            console.log("findUserBag,findUserBag",findUserBag);

              return {
                  status: true,
                  data:findUserBag,
                  message: "Lấy danh sách đơn hàng thành công",
                }
  
            }
          }
          return {
            status: false,
            message: "Chưa đăng nhập",
          }
        }
        catch(err){
          return {
            status: false,
            message: "Lấy đơn hàng thất bại !",
            // data: null
                }
        }
    },
    
}