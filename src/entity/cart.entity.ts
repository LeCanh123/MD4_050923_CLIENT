import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany } from "typeorm"
import { Bag } from "./bag.entity" 
@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: null

    @Column()
    bagId!: number 

    @Column()
    productId!: number 

    @Column({
        nullable:true
    })
    block!: string
    
    //nhiều cart 1 túi
    @ManyToOne(() => Bag, (bag) => bag.id)
    bags!: Bag

}