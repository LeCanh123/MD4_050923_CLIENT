

//update
let updateConfirm=await userRepository
.createQueryBuilder()
.update(User)
.set({ emailconfirm: "true"})
.where("id = :id", { id: findUserConfirm[0].id })
.execute()

//delete
let changeQuantity= await userCartRepository
                  .createQueryBuilder('users')
                  .delete()
                  .from(Cart)
                  .where("id = :id", { id: findProductInCart[0].id })
                  .execute()

//find
let findUserConfirm=await userRepository.find({where:{username:confirmResult.username,emailconfirm:"null"}});



//tạo mới
const userRepository = connection.getRepository(User);
await userRepository.save(data);


//product kèm hình ảnh
const getProductRepository = connection.getRepository(Product);
const products = await getProductRepository.find({ relations: ['productimage'] });
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string 

    @Column()
    price!: number 

    @Column()
    actualprice!: number 

    @Column({
        nullable:true
    })
    block!: string 

    @ManyToOne(() => Category, (category) => category.products)
    category!: Category
    @OneToMany(() => ProductImage, (productimage) => productimage.products)
    productimage!: ProductImage[]
}


//json web token giải mã
import jsonWeb1 from "./../services/jwt/index"
let unpack:any= jsonWeb1.verifyToken(usertoken);
      console.log("unpack,unpack",unpack);

if(unpack){
//tìm thông tin user
const userRepository = connection.getRepository(User);
let findUserChangeInfo=await userRepository.find({where:{username:unpack.username}});
return {
    status:true,
    message:"",
    data:findUserChangeInfo[0]
}
}