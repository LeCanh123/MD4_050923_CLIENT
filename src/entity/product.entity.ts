import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany, JoinColumn } from "typeorm"
import { Category } from "./category.entity" 
import { ProductImage } from "./productimage.entity"

@Entity()
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