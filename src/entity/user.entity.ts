import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Product } from "./product.entity"
import { Bag } from "./bag.entity"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: null

    @Column({ unique: true })
    username!: string 

    @Column({ unique: true })
    email!: string 

    @Column({
        nullable:true
    })
    emailconfirm!: string 

    @Column()
    firstname!: string 

    @Column()
    lastname!: string

    @Column()
    password!: string

    @Column({
        nullable:true
    })
    avatar!: string

    @Column({
            nullable:true
        })
    createat!: Date

    @Column({
        nullable:true
    })
    block!: string

    // @Column({
    //     nullable:true
    // })
    // age!: string
    // @OneToMany(() => Product, (product) => product.user)
    // products!: Product[]
    //1 user có nhiều túi
    @OneToMany(() => Bag, (bag) => bag.user)
    bags!: Bag[]

}