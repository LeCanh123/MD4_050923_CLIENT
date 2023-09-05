import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Product } from "./product.entity" 

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string 

    @Column({
        nullable:true
    })
    block!: string 

    // @OneToMany(() => Product, (product) => product.id)
    // products!: Product[]

}