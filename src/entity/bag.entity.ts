import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany } from "typeorm"
import { User } from "./user.entity" 
import { Cart } from "./cart.entity"
@Entity()
export class Bag {
    @PrimaryGeneratedColumn()
    id!: null

    @Column()
    userId!: number

    @Column({
        nullable:true
    })
    block!: string
    
    //nhiều túi 1 user
    @ManyToOne(() => User, (user) => user.id)
    user!: User

    //1 túi nhiều cart
    // @OneToMany(() => Cart, (cart) => cart.id)
    // bags!: Cart[]

}