import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany } from "typeorm"
import { Bag } from "./bag.entity" 
import { Product } from "./product.entity"
@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number

    // @Column()
    // productId!: number 

    @Column()
    quantity!: number 

    @Column({
        nullable:true
    })
    block!: string
    
    //nhiều cart 1 túi
    @ManyToOne(() => Bag, (bag) => bag.carts)
    bag!: Bag

    //nhiều cart 1 product
    @ManyToOne(() => Product, (product) => product.carts)
    products!: Product

}