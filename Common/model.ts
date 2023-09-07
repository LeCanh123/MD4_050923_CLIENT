

//update
let updateConfirm=await userRepository
.createQueryBuilder()
.update(User)
.set({ emailconfirm: "true"})
.where("id = :id", { id: findUserConfirm[0].id })
.execute()

//find
let findUserConfirm=await userRepository.find({where:{username:confirmResult.username,emailconfirm:"null"}});


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