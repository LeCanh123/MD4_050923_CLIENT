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





  export default  {
    //category
    addCategory: async (data:any) => {
        try {
          console.log(data);
          let categoryData={
            name:data.name,
            sex:data.sex,
            block:"null"
          }
          const categoryRepository = connection.getRepository(Category);
          const categorys=await categoryRepository.save(categoryData);

          return {
            status: true,
            messsage: "Add Category success !",
            // data: users
          }

          
        } catch (err:any) {
          console.log('Error Add Category:', err);
          if (err.toString().includes("Duplicate") ) {
            return {
              status: false,
              messsage: "Trùng category ",
          }
          }
          return {
            status: false,
            messsage: "Lỗi hệ thống ",
        }
        }
    },
    getCategory: async () => {
      try {
        const categoryRepository = connection.getRepository(Category);
        const categorys = await categoryRepository.find({where:{block:"null"}});
        console.log("categorys",categorys);
        
        return {
          status: true,
          messsage: "Get Category success !",
          data: categorys
        }

        
      } catch (err:any) {
       
        // console.log('Error getting Category:', err);
        return {
          status: false,
          messsage: "Error getting Category !",
      }
      }
    },
    deleteCategory: async (data:any) => {
      console.log("data deleteCategory",data);
      
      try {
        const categoryRepository = connection.getRepository(Category);
        let findCategory=await categoryRepository.find({where:{id:data.id}});
        console.log("findCategory",findCategory);
        if(findCategory.length==0){
          let findCategory1=await categoryRepository.find({where:{block:"null"}});
          if(findCategory1.length==0){
            return {
              status: false,
              messsage: "Error delete Category !",
                  }
          }else{
            let updateCategory=await categoryRepository
            .createQueryBuilder()
            .update(Category)
            .set({ block: "true"})
            .where("id = :id", { id: findCategory1[0].id })
            .execute()
            return {
              status: true,
              messsage: "Delete Category success !",
              data: "null"
            }
          }

        }
        let updateCategory=await categoryRepository
            .createQueryBuilder()
            .update(Category)
            .set({ block: "true"})
            .where("id = :id", { id: data.id })
            .execute()
        return {
          status: true,
          messsage: "Delete Category success !",
          data: "null"
        }

        
      } catch (err:any) {
       
        // console.log('Error getting Category:', err);
        return {
          status: false,
          messsage: "Error delete Category !",
              }
      }
      
    },
    //product
    addProduct: async (data:any) => {
      console.log("Modeldata",data);
      
      
      try {
        //dữ liệu mẫu
      
        let data1:any={
          title:data.title,
          price:data.price,
          actualprice:data.actualprice,
          category:data.categoryId,
        }

        let productRepository = connection.getRepository(Product);
        const categorys=await productRepository.save(data1);
        console.log("categorys 22345",categorys);


        let data2:any={
          image:String(data.image),
          img1:String(data.img1),
          img2:String(data.img2),
          img3:String(data.img3),
          img4:String(data.img4),
          products:categorys.id
        }
        let productImageRepository = connection.getRepository(ProductImage);
        const images=await productImageRepository.save(data2);
        return  {
          status: true,
          messsage: "Add Product success !",
          // data: users
                }

        
      } catch (error) {
        console.log('Error Add Product:', error);
        return  {
          status: false,
          messsage: "Error Add Product !",
                }
      }
    },
    editProduct: async (data:any) => {
      try {
        const categoryRepository = connection.getRepository(Category);
        const categorys=await categoryRepository.save(data);

        // const users = await userRepository.find({
        //   select: {email: true,password:true},
        // });

        return {
          status: true,
          messsage: "Add Category success !",
          // data: users
      }

        
      } catch (error) {
        console.log('Error Add Category:', error);
        return {
          status: false,
          messsage: "Error Add Category !",
      }
      }
    },
    deleteProduct: async (data:any) => {
      try {
        const categoryRepository = connection.getRepository(Category);
        const categorys=await categoryRepository.save(data);

        // const users = await userRepository.find({
        //   select: {email: true,password:true},
        // });

        return {
          status: true,
          messsage: "Add Category success !",
          // data: users
              }

        
      } catch (error) {
        console.log('Error Add Category:', error);
        return {
          status: false,
          messsage: "Error Add Category !",
      }
      }
    },
    productGetcategory: async () => {
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
            message:"productGetcategory thành công",
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

    //test
    test: async () => {
      console.log("model productGetcategory");
      
      try {
        const getProductRepository = connection.getRepository(Product);
        const products = await getProductRepository.find({ relations: ['productimage'] });
        console.log("products tesst ",products);
        return products
        
        //nếu không có category



      } catch (err:any) {
       
        // console.log('Error getting Category:', err);
        return {
          status: false,
          messsage: "Error productGetcategory !",
          data:{},
      }
      }
    },

}