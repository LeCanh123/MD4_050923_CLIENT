import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany } from "typeorm"
import { User } from "./user.entity" 
import { Cart } from "./cart.entity"
@Entity()
export class Bag {
    @PrimaryGeneratedColumn()
    id!: null

    // @Column()
    // userId!: string

    @Column({
        nullable:true
    })
    block!: string
    
    //nhiều túi 1 user
    @ManyToOne(() => User, (user) => user.bags)
    user!: User

    // 1 túi nhiều cart
    @OneToMany(() => Cart, (cart) => cart.bag)
    carts!: Cart[]

}