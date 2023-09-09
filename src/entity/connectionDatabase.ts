import { createConnection, Connection } from 'typeorm';
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from './productimage.entity';
import { Address } from './address.entity';

export let connection: Connection;
(async () => {
    try {
      connection = await createConnection({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'md4_db',
        entities: [User,Product,ProductImage,Bag,Cart,Category,Address],
        synchronize: true,
      });
    } catch (error) {
        console.log(error);
        
      console.log('Database connection error:123');
    }
  })();
