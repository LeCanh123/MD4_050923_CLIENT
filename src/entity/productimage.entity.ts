import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Product } from "./product.entity" 

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: null

    @Column()
    image!: string 

    @Column()
    img1!: string 

    @Column()
    img2!: string 

    @Column()
    img3!: string 

    @Column()
    img4!: string 

    @Column({
        nullable:true
    })
    block!: string 

    @ManyToOne(() => Product, (product) => product.productimage)
    products!: Product

}