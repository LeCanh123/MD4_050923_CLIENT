import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Product } from "./product.entity" 

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id!: null

    @Column()
    image!: string 

    @Column({
        nullable:true
    })
    block!: string 

    @ManyToOne(() => Product, (product) => product.id)
    products!: Product

}