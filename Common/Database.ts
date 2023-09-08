


//where
const userRepository = connection.getRepository(User);
let findUserConfirm=await userRepository.find({where:{username:confirmResult.username,emailconfirm:"null"}});


//
import { In } from 'typeorm';
const products = await productRepository.find({ where: { category: { id: In([1, 2, 3]) } } });

const categoryRepository = connection.getRepository(Category);
const categorys = await categoryRepository.find({where:{sex:"men"}});
const categoryIds = categorys.map(category => category.id);
console.log("categorys men",categorys);
//lấy sản phẩm sau khi get category
const productRepository = connection.getRepository(Product);
const products = await productRepository.find({ where: { category: { id: In(categoryIds) } } });
console.log("products men",products);


//kết hợp 2 bảng
const getProductRepository = connection.getRepository(Product);
const products = await getProductRepository.find({ relations: ['productimage'] });

//kết hợp nhiều loại
const productRepository = connection.getRepository(Product);
const products = await productRepository.find({ where: { category: { id: In(categoryIds) } },relations: ['productimage'] });