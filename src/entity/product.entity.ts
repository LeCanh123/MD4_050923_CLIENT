import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany } from "typeorm"
import { Category } from "./category.entity" 
import { ProductImage } from "./productimage.entiey"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: null

    @Column()
    name!: string 

    @Column({
        nullable:true
    })
    block!: string 

    @ManyToOne(() => Category, (category) => category.id)
    categorys!: Category

    // @OneToMany(() => ProductImage, (productimage) => productimage.id)
    // productimage!: ProductImage[]
}