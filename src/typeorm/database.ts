import { createConnection } from 'typeorm';

createConnection({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'md4_db',
  entities: [__dirname + 'src/typeorm/*.ts'],
  synchronize: true,
})
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });