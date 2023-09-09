//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entity';

//type orm
import { In } from 'typeorm';
import { connection } from '../entity/connectionDatabase';

//jwt
import jsonWeb1 from "./../services/jwt/index"

  export default  {
    getMenProduct: async () => {
        try {
          const categoryRepository = connection.getRepository(Category);
          const categorys = await categoryRepository.find({where:{sex:"men"}});
          const categoryIds = categorys.map(category => category.id);
          console.log("categorys men",categorys);
          
          const productRepository = connection.getRepository(Product);
          const products = await productRepository.find({ where: { category: { id: In(categoryIds) } },relations: ['productimage'] });
          console.log("products men",products);
 
          return {
            status: true,
            message: "Get MenProduct success !",
            data: products
        }

          
        } catch (error) {
          console.log('Error getting MenProduct:', error);
          return {
            status: false,
            message: "Error getting MenProduct !",
        }
        }
    },
    addToCart: async (data:any) => {
      //giải mã token
      try{
        let unpack:any= jsonWeb1.verifyToken(data.token);
        console.log(unpack);
        if(unpack){
          const userCart = connection.getRepository(Cart);
          //tìm thông tin user
          const userRepository = connection.getRepository(User);
          let findUserChangeInfo=await userRepository.find({where:{username:unpack.username}});
          //thêm sản phẩm vào giỏ hàng
          //tìm giỏ hàng
          const userBag = connection.getRepository(Bag);
          let findUserBag:any=await userBag.find({where:{user:unpack.id,block:"null"}});
          //nếu không thấy giỏ hàng
          //tạo giỏ hàng
          if(findUserBag.length==0){
            let createUserBag=await userBag.save({block:"null",user:findUserChangeInfo[0]?.id!});
            //thêm hàng vào giỏ vừa tạo
            let addUserCart=await userCart.save({block:"null",bag:createUserBag?.id!,quantity:1,products:data.id});
            return {
              status: true,
              message: "Thêm sản phẩm thành công",
            }
          //nếu thấy giỏ hàng
          }else{
          console.log("đã có giỏ hàng");
          console.log("userBag.length",findUserBag);
          //tìm sản phẩm trong giỏ hàng
          let findUserCart=await userCart.find({where:{block:"null",bag:findUserBag[0].id!,products:{id:data.id}}});
              //nếu sản phẩm chưa có trong giỏ hàng
              if(findUserCart.length==0){
                  //thêm hàng vào giỏ vừa tìm
                  let addUserCart=await userCart.save({block:"null",bag:findUserBag[0].id!,quantity:1,products:data.id});
                  return {
                    status: true,
                    message: "Add Product success !",
                    // data: null
                        }
              }
               //nếu sản phẩm đã có trong giỏ hàng
              else{
                  //update hàng trong giỏ vừa tìm
                  let addUserCart=await userCart
                                        .createQueryBuilder()
                                        .update(Cart)
                                        .set({ quantity:(findUserCart[0].quantity+1)})
                                        .where("id = :id", { id: findUserCart[0].id })
                                        .execute()
                  
                  return {
                    status: true,
                    message: "Add Product success !",
                    // data: null
                        }
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
          message: "Add Product thất bại !",
          // data: null
              }
      }
    },
    getCart: async (token:any) => {
    //giải mã token
      try{
        let unpack:any= jsonWeb1.verifyToken(token);
        console.log(unpack);
        if(unpack){
          //lấy sản phẩm trong giỏ
          //tìm giỏ hàng
          const userBag = connection.getRepository(Bag);
          let findUserBag:any=await userBag.find({where:{user:unpack.id,block:"null"}});
            //nếu không tìm thấy giỏ
            if(findUserBag.length==0){
              return {
                status:false,
                message:"Chưa Có Sản Phẩm trong giỏ",
                data:[]
              }
            }
            //nếu tìm thấy giỏ
            else{
              //tìm sản phẩm trong giỏ
              const userCartRepository = connection.getRepository(Cart);
              let findUserCart=await userCartRepository.find({where:{bag:{id:findUserBag[0].id,}},
                                                              relations: ['products','products.productimage']
                                                          });
              console.log("sản phẩm trong giỏ",findUserCart);
              return {
                status:false,
                message:"Lấy giỏ hàng không thành công",
                data:findUserCart
              }       

            }

        }
        return {
          status:false,
          message:"Lấy giỏ hàng không thành công",
          data:[]
        }
      }
      catch(err){
        return {
          status:false,
          message:"Lỗi hệ thống",
          data:[]
        }

      }






      return {
        status:true
      }
    },
    deleteProduct: async (data:any) => {
      console.log("data",data);
      
      //giải mã token
        try{
          let unpack:any= jsonWeb1.verifyToken(data.token);
          console.log(unpack);
          if(unpack){
            //lấy sản phẩm trong giỏ
            //tìm giỏ hàng
            const userBag = connection.getRepository(Bag);
            let findUserBag:any=await userBag.find({where:{user:unpack.id,block:"null"}});
              //nếu không tìm thấy giỏ
              if(findUserBag.length==0){
                return {
                  status:false,
                  message:"Sản Phẩm không tồn tại",
                  data:[]
                }
              }
              //nếu tìm thấy giỏ
              else{
                //tìm sản phẩm trong giỏ
                const userCartRepository = connection.getRepository(Cart);
                // let findProductInCart=await userCartRepository.find({where:{products:{id:data.id}}});
                let findProductInCart=await userCartRepository.find({where:{id:data.id}});
                 //nếu không tìm thấy trong giỏ
                 if(findProductInCart.length==0){
                    return {
                      status:false,
                      message:"Sản Phẩm không tồn tại",
                      data:[]
                    }
                 }                                               
                 //nếu tìm thấy sản phẩm trong giỏ
                  console.log("sản phẩm trong giỏ",findProductInCart);
                  //xoá sản phẩm trong giỏ
                  let deleteProduct= await userCartRepository
                  .createQueryBuilder('users')
                  .delete()
                  .from(Cart)
                  .where("id = :id", { id: findProductInCart[0].id })
                  .execute()

                  return {
                    status:true,
                    message:"Xoá sản phẩm thành công",
                  }       
  
              }
  
          }
          return  {
            status:false,
            message:"Chưa đăng nhập",
                  }
        }
        catch(err){
          return {
            status:false,
            message:"Lỗi hệ thống",
          }
        }
    },
    changeQuantity: async (data:any) => {
      console.log("data",data);
      
      //giải mã token
        try{
          let unpack:any= jsonWeb1.verifyToken(data.token);
          console.log(unpack);
          if(unpack){
            //lấy sản phẩm trong giỏ
            //tìm giỏ hàng
            const userBag = connection.getRepository(Bag);
            let findUserBag:any=await userBag.find({where:{user:unpack.id,block:"null"}});
              //nếu không tìm thấy giỏ
              if(findUserBag.length==0){
                return {
                  status:false,
                  message:"Giỏ hàng không tồn tại",
                }
              }
              //nếu tìm thấy giỏ
              else{
                //tìm sản phẩm trong giỏ
                const userCartRepository = connection.getRepository(Cart);
                // let findProductInCart=await userCartRepository.find({where:{products:{id:data.id}}});
                let findProductInCart=await userCartRepository.find({where:{products:{id:data.id}}});
                 //nếu không tìm thấy trong giỏ
                 if(findProductInCart.length==0){
                    return {
                      status:false,
                      message:"Sản Phẩm không tồn tại",
                    }
                 }                                               
                 //nếu tìm thấy sản phẩm trong giỏ
                  console.log("sản phẩm trong giỏ",findProductInCart);
                  //xoá sản phẩm trong giỏ
                  let changeQuantity= await userCartRepository
                    .createQueryBuilder()
                    .update(Cart)
                    .set({ quantity:data.type=="increase"?findProductInCart[0].quantity+1:findProductInCart[0].quantity-1 })
                    .where("id = :id", { id: findProductInCart[0].id })
                    .execute()

                  return {
                    status:true,
                    message:data.type=="increase"?"Tăng số lượng thành công":"Giảm số lượng thành công",
                  }       
  
              }
  
          }
          return  {
            status:false,
            message:"Chưa đăng nhập",
                  }
        }
        catch(err){
          return {
            status:false,
            message:"Lỗi hệ thống",
          }
        }
    },
    getcategory: async () => {
      console.log("model productGetcategory");
      
      try {
        const categoryRepository = connection.getRepository(Category);
        const categorys = await categoryRepository.find({where:{block:"null"}});
        //nếu không có category
        if(categorys.length==0){
          return {
            status:false,
            message:"Không có category",
            data:{}
          }
        //nếu có category
        }else{
          const result:any = {};
          for (const item of categorys) {
            const { sex, id, name } = item;
            if (!(sex in result)) {
              result[sex] = [];
            }
            result[sex].push({ id, name });
          }
          console.log("result",result);
          return {
            status:true,
            message:"getcategory thành công",
            data:result
          }
        }
      } catch (err:any) {
       
        // console.log('Error getting Category:', err);
        return {
          status: false,
          messsage: "Error productGetcategory !",
          data:{},
      }
      }
    },
    getProductByCategory: async (listCategory:any) => {
      try {
        const categoryRepository = connection.getRepository(Category);
        const categorys = await categoryRepository.createQueryBuilder('category')
        .where('category.sex = :sex', { sex: 'men' })
        .where('category.name IN (:...names)', {names: listCategory })
        // .leftJoinAndSelect('category.products', 'product')
        .getMany();
        // console.log("categoryscategoryscategorys",categorys);



        const categoryIds = categorys.map(category => category.id);
        // console.log("categorys men",categoryIds);
        
        const productRepository = connection.getRepository(Product);
        const products = await productRepository.find({ where: { category: { id: In(categoryIds) } },relations: ['productimage'] });
        // console.log("products men",products);

        return {
          status: true,
          message: "Get Product by category success !",
          data: products
                }

        
      } catch (error) {
        console.log('Error getting getProductByCategory:', error);
        return {
          status: false,
          message: "Error getting getProductByCategory !",
      }
      }
      
    },
    
}