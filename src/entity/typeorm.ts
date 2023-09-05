import { User } from "./user.entity"
import { createConnection } from 'typeorm';

createConnection({
  type: 'mysql', // Loại cơ sở dữ liệu (ví dụ: 'mysql', 'postgres', 'sqlite', ...)
  host: '127.0.0.1', // Tên host cơ sở dữ liệu (ví dụ: 'localhost')
  port: 3306, // Cổng kết nối cơ sở dữ liệu
  username: 'root', // Tên đăng nhập cơ sở dữ liệu
  password: '', // Mật khẩu cơ sở dữ liệu
  database: 'md4_db', // Tên cơ sở dữ liệu
  entities: [
    // Danh sách các entity (thực thể) sử dụng trong ứng dụng
    // (ví dụ: import { User } from './entities/User';)
    User,
  ],
  synchronize: true, // Tự động đồng bộ các thay đổi với cơ sở dữ liệu
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });