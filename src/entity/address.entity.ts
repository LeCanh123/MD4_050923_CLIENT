import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Product } from "./product.entity"
import { Bag } from "./bag.entity"
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string 

    @Column()
    building!: string 


    @Column()
    city!: string 

    @Column()
    mobile!: string 

    @Column()
    pin!: string 

    @Column()
    state!: string 

    //nhiều address 1 bag
    @ManyToOne(() => Bag, (bag) => bag.address)
    bag!: Bag

}