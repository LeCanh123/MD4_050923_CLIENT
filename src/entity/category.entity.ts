import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Product } from "./product.entity" 

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    sex!: string 

    @Column({ unique: true })
    name!: string 

    @Column({
        nullable:true
    })
    block!: string 

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[]

}