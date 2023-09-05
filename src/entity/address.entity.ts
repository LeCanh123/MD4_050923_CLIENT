import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Product } from "./product.entity"
import { Bag } from "./bag.entity"
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id!: null

    @Column({ unique: true })
    housenumber!: string 

    @Column({ unique: true })
    district!: string 


    @ManyToOne(() => Bag, (bag) => bag.id)
    bags!: Bag[]

}