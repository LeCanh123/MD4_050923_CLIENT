//typeORM Object Relational Mapper (ORM)
import { createConnection, Connection } from 'typeorm';
//entity list
import { User } from '../entity/user.entity'; 
import { Product } from '../entity/product.entity';
import { Bag } from '../entity/bag.entity'; 
import { Cart } from '../entity/cart.entity'; 
import { Category } from '../entity/category.entity';
import { ProductImage } from '../entity/productimage.entiey';
//Send mail
import MailService from "./../services/mail/index"
//template ejs email send
import genEmailString from '../services/template/emailConfirm';
//jwt mã hoá token
import jsonWeb1 from "./../services/jwt/index"
//tạo vs giải mã mật khẩu bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//



export interface UserType{
  username:string;
  email:string;
  emailconfirm:string;
  firstname:string;
  lastname:string;
  password:string;
  avatar:string;
  createat:Date;
  block:string;
}




let connection: Connection;
(async () => {
    try {
      connection = await createConnection({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'md4_db',
        entities: [User,Product,ProductImage,Bag,Cart,Category],
        synchronize: true,
      });
    } catch (error) {
      console.log('Database connection error:');
    }
  })();


export default  {
    getUser: async () => {
        try {
          const userRepository = connection.getRepository(User);
          const users = await userRepository.find();

          // const users = await userRepository.find({
          //   select: {email: true,password:true},
          // });

          return {
            status: true,
            messsage: "Get users success !",
            data: users
        }

          
        } catch (error) {
          console.log('Error getting users:', error);
          return {
            status: false,
            messsage: "Error getting users !",
        }
        }
    },
    addUser: async function (data:UserType):Promise<any> {
        try {
            const userRepository = connection.getRepository(User);
            await userRepository.save(data);
            let createConfirmEmailToken= jsonWeb1.createToken({username:data.username,time:new Date()}, 30000);
            console.log(createConfirmEmailToken);
            
            let resultGenEmailString=genEmailString({
              productName:"Clothes Shop",              //tên shop
              productUrl:"canh123.lambogini",
              receiveName:data.email,               //email người nhận
              confirmLink:`http://127.0.0.1:4000/apis/v1/confirmuser/${createConfirmEmailToken}`
            })

            await MailService.sendMail(
                  {
                      to: data.email,
                      subject: "Xác Thực Tài Khoản",
                      html: resultGenEmailString
                  }
            )
            return {
                status: true,
                message: "Register thành công! Kiểm tra email để xác nhận tài khoản",
            }

        }catch(err:any) {
            // console.log(err,"loiiii");
            // nếu lỗi trùng email
            console.log("có duplicate",err.toString().includes("Duplicate"));
            console.log("có @",err.toString().includes("@"));
            if (err.toString().includes("Duplicate") && err.toString().includes("@")) {
                // return {data:"trùng mail"}
                console.log("1234 trung mail");

                try {
                    //tìm email chưa xác nhận trong database
                    const userRepository = connection.getRepository(User);
                    const user = await userRepository.find(
                      {
                        where: {
                            email: data.email,
                            emailconfirm:"null"
                        },
                    }
                    );
                    console.log("ussssser",user);//tìm được user

                    
                    //nếu không có email chưa kích hoạt trả về đã tồn tại
                    if (!user) {
                        return {
                            status: false,
                            message: "Email đã tồn tại!"
                        }
                    //nếu có email chưa kích hoạt
                    }else {
                        let nowDay = new Date(Date.now());
                        let flag = false;
                        let flag2=false;
                        //nếu năm hiện tại bằng năm của tài khoản lúc tạo
                        user.forEach(async (user: User) => {
                          console.log("vào forreach");
                          
                          if (nowDay.getFullYear() == user.createat.getFullYear() 
                          &&nowDay.getMonth() == user.createat.getMonth()
                          &&nowDay.getDay() == user.createat.getDay()
                           ) {
                           //nếu giờ hiện tại bằng giờ của tài khoản lúc tạo
                          if (nowDay.getHours() == user.createat.getHours()) {
                              //nếu phút hiện tại -phút của tài khoản tạo lớn hơn 5 trả về flag true
                              if (nowDay.getMinutes() - user.createat.getMinutes() > 5) {
                                  flag = true;
                              //nếu phút hiện tại -phút của tài khoản tạo nhỏ hơn 5 trả về status false
                              }else {
                                flag2=true;
                                  return {
                                      status: false,
                                      message: `Email đã tồn tại nhưng chưa được kích hoạt, sau ${5 - (nowDay.getMinutes() - user.createat.getMinutes())} phút thử đăng ký lại!`
                                  }
                              }
                          //nếu giờ hiện tại không bằng giờ của tài khoản lúc tạo
                          }else {
                              flag = true;
                          }
                  //nếu năm hiện tại không bằng năm của tài khoản lúc tạo
                     }else {
                      flag = true;
                     }

                     //nếu flag =true xoá tài khoản cũ bằng cách thay đổi email
                        })
                    if(flag2){
                          return {
                            status: false,
                            message: `Email đã tồn tại nhưng chưa được kích hoạt, sau ${5 - (nowDay.getMinutes() - user[0].createat.getMinutes())} phút thử đăng ký lại!`
                        }
                         }
                         
                     if (flag) {
                      try {
                          const userRepository = connection.getRepository(User);
                          const users = await userRepository.createQueryBuilder()
                          .update(User)
                          .set({ email:  `${Date.now() * Math.random()}@fakemail.com`})
                          .where("id = :id", { id: user[0].id })
                          .execute()

                          //tạo user mới sau khi xoá user cũ
                          return await this.addUser(data);
                      }catch(err) {
                          // xuất file log
                          //console.log("err loi can xu ly tay", err)
                          return {
                              status: false,
                              message: "Email đã tồn tại"
                          }
                      }
                    //nếu flag = false email đã tồn tại
                    }else{
                      return {
                        status: false,
                        message: "Email đã tồn tại"
                    }
                     }

  
                    }


                }catch(err) {
                    return {
                        status: false,
                        message: "Hệ thống bận, thử lại sau!"
                    }
                }
            }

            //nếu không có lỗi trùng email
            //nếu có lỗi trùng user
            if (err.toString().includes("Duplicate")&&err.toString().includes("@")){
              return {
                status: false,
                message: "Email đã Tồn tại"
            }
            }
            if (err.toString().includes("Duplicate")){
              return {
                status: false,
                message: "Username đã Tồn tại"
            }
            }
            return {
                status: false,
                message: "Đăng ký thất bại!"
            }
        }
    },
    googleAddUser: async function (userdata:UserType):Promise<any> {
      console.log("userdata.email",userdata.email);

      try{
        //tìm email user trong database
        const userRepository = connection.getRepository(User);
        // const users = await userRepository.find();
        //tìm tên user email trong database
        const userAbout = await userRepository.find(
          {where: {email: userdata.email}}
        );
        //nếu tìm thấy user email
        console.log(userAbout,"userAbout");
        if(userAbout[0].email){
          console.log("userAbout[0]",userAbout[0]);
          //update lại confirm email nếu đã đăng kí tài khoản trước đó mà chưa xác nhận
          await userRepository
          .createQueryBuilder()
          .update(User)
          .set({ emailconfirm: "true"})
          .where("id = :id", { id: userAbout[0].id })
          .execute()

          return {
            status:true,
            message:"Đăng nhập thành công",
            token:jsonWeb1.createTokenforever({...userAbout[0]}),
            lastname:`${userAbout[0].lastname}`
          }
        }

        //nếu không tìm thấy users email xuống err
      }
      catch(err:any){
        console.log("err123",err);
        //nếu không tìm thấy user
        if(err.toString().includes("Cannot read properties of undefined (reading 'email')")){
          const userRepository = connection.getRepository(User);
          let registerResult=await userRepository.save(userdata);
          console.log("registerResult",registerResult);
          //nếu đăng kí thành công
          if(registerResult.email){
            //check đăng nhập lại
            return this.googleAddUser(userdata);
          //nếu đăng kí không thành công
          }else{
            return {
              status:false,
              message:"Hệ thống bận thử lại sau"
            }
          }

          //nếu đăng kí thất bại
        }



        //nếu lỗi kết nối database
        if(err.toString().includes("connect ECONNREFUSED 127.0.0.1:3306")){
          return {
            status:false,
            message:"Hệ thống bận thử lại sau"
          }
        }
      }



    },
    deleteUser:async function (id:number) {
        try {
          const userRepository = connection.getRepository(User);
          let result= await userRepository
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id: id })
          .execute();
          console.log(result.affected);
          
          if (result.affected==0) {
            return {
              message:"Người dùng không tồn tại"
            }
          }
          return {
            message:"Xoá người dùng thành công"
          }


        } catch (error) {
            return {
              message:"Lỗi hệ thống"}
          // console.log('Error delete user:', error);
        }
    },
    confirmUser:async function (token:string) {

        try {
          // const userRepository = connection.getRepository(User);
          // return await userRepository
          // .createQueryBuilder()
          // .delete()
          // .from(User)
          // .where("id = :id", { id: id })
          // .execute();
          let confirmResult:any={time:new Date,user:String};
          let nowTime:Date=new Date;
          confirmResult=jsonWeb1.verifyToken(token);
          console.log(confirmResult);
          const confirmTime: Date = new Date(confirmResult.time);
          //nếu thời gian nhỏ hơn 5 phút (300 giây)
          if((nowTime.getTime() - confirmTime.getTime())/1000<300){
            
            //tìm user trong database
            const userRepository = connection.getRepository(User);
            let findUserConfirm=await userRepository.find({where:{username:confirmResult.username,emailconfirm:"null"}});

            let updateConfirm=await userRepository
            .createQueryBuilder()
            .update(User)
            .set({ emailconfirm: "true"})
            .where("id = :id", { id: findUserConfirm[0].id })
            .execute()

            return {
              status:true,
              message:"Xác nhận email thành công",
              
            }
          }else{
            return {
              status:false,
              message:"Token đã hết hiệu lực",
              time:(nowTime.getTime() - confirmTime.getTime())/1000
            }
          }

        } catch (error) {
          console.log(error);
          
              return {
              status:false,
              message:"Lỗi hệ thống",
             
            }
          console.log('Error confirm user:', error);
        }
    },
    userLogin:async function (userdata:any) {
      console.log("userdata",userdata);
      //kiểm tra tài khoản là username hay email
            function ValidateEmail(mail:string) 
            {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {return true}return false}
      //hàm chính       
      try {
        let isCorrectPassword;
        const userRepository = connection.getRepository(User);
        // const users = await userRepository.find();
        //tìm tên user trong database
        const userAbout = await userRepository.find(
          ValidateEmail(userdata.email)?
          //nếu là email
          {where: {email: userdata.email}}:
          //nếu là username
          {where: {username: userdata.email}}
        );

        console.log("userAbout",userAbout);
        isCorrectPassword=await bcrypt.compare(userdata.password, userAbout[0].password);
      //nếu đúng mât khẩu
      if(isCorrectPassword){
        //nếu đăng nhập bằng email
        if(ValidateEmail(userdata.email)){
          //nếu email chưa xác thực
          if(userAbout[0].emailconfirm=="null"){
            return {
              status:false,
              message:"Email chưa xác thực,hãy đăng nhập bằng userName"
            }
          //nếu email đã xác thực
          }else{
            console.log(`userAbout[0]`,userAbout[0]);
            
            return {
              status:true,
              message:"Đăng nhập thành công",
              token:jsonWeb1.createTokenforever({...userAbout[0]}),
              lastname:`${userAbout[0].firstname} ${userAbout[0].lastname}`
            }
          }
        }
        //nếu đăng nhập bằng userName
        return {
          status:true,
          message:"Đăng nhập thành công",
          token:jsonWeb1.createTokenforever({...userAbout[0]}),
          lastname:`${userAbout[0].firstname} ${userAbout[0].lastname}`
        }
      //nếu sai mật khẩu
      }else{
        return {
          status:false,
          message:"Sai mật khẩu"
        }
      }


      } catch (error:any) {
        console.log(error);
        //nếu tìm không thấy người dùng trong database
        if(error.toString().includes("Cannot read properties of undefined")){
          return  {
            status:false,
            message:"Sai tài khoản",
                    }
        }
        //nếu lỗi khác
            return  {
            status:false,
            message:"Lỗi hệ thống",
                    }
      }
    },
    userGetChangeInfo:async function(usertoken:string) {
    //giải mã token
    try{

      let unpack:any= jsonWeb1.verifyToken(usertoken);
      console.log("unpack,unpack",unpack);
      
      //nếu giải nén thành công
      if(unpack){
        //tìm thông tin user
        const userRepository = connection.getRepository(User);
        let findUserChangeInfo=await userRepository.find({where:{username:unpack.username}});
        return {
          status:true,
          message:"",
          data:findUserChangeInfo[0]
        }
      }
      //nếu giải nén thất bại
      return {
        status:false,
        message:"Chưa đăng nhập",
        data:unpack
      }

      // console.log("ResultUser,",ResultUser);
    }
    catch(err){
      console.log("lỗi confirmTokenLogin use.middleware");
      return {
        status:false,
        message:"Lỗi hệ thống",
      }
    }

    },
    userChangeInfo:async function(updateData:any) {
  console.log("updateData",updateData);
    //giải nén token
    try{

      let unpack:any= jsonWeb1.verifyToken(updateData.token);
      console.log(unpack);
      
      //nếu giải nén thành công
      if(unpack){
        let hashpassword="s";
        const salt = await bcrypt.genSalt(saltRounds);
        hashpassword = await bcrypt.hash(updateData.data.password, salt);
        //update lại thông tin user
        const userRepository = connection.getRepository(User);
        if(updateData.data.firstname&&updateData.data.lastname&&updateData.data.password){
          let updateConfirm=await userRepository
          .createQueryBuilder()
          .update(User)
          .set({password:hashpassword})
          .where("id = :id", { id: unpack.id })
          .execute()
        }
        if(updateData.data.firstname){
          let updateConfirm=await userRepository
          .createQueryBuilder()
          .update(User)
          .set({firstname:updateData.data.firstname})
          .where("id = :id", { id: unpack.id })
          .execute()
        }
        if(updateData.data.lastname){
          let updateConfirm=await userRepository
          .createQueryBuilder()
          .update(User)
          .set({lastname:updateData.data.lastname})
          .where("id = :id", { id: unpack.id })
          .execute()
        }


        return {
          status:true,
          message:"Update thành công",
        }
      }
      //nếu giải nén thất bại
      return {
        status:false,
        message:"Chưa đăng nhập",
      }

      // console.log("ResultUser,",ResultUser);
    }
    catch(err){
      return {
        status:false,
        message:"Lỗi hệ thống",
      }
    }
    },
    userChangeConfirm:async function(token:any) {
    //giải mã token
    try{

      let unpack:any= jsonWeb1.verifyToken(token);
      console.log(unpack);
      //nếu giải nén thành công
      if(unpack){
      //gửi email confirm
      let createConfirmEmailToken= jsonWeb1.createToken({username:unpack.username,time:new Date()}, 30000);
            console.log(createConfirmEmailToken);
            
            let resultGenEmailString=genEmailString({
              productName:"Clothes Shop",              //tên shop
              productUrl:"canh123.lambogini",
              receiveName:unpack.email,               //email người nhận
              confirmLink:`http://127.0.0.1:4000/apis/v1/confirmuser/${createConfirmEmailToken}`
            })

            await MailService.sendMail(
                  {
                      to: unpack.email,
                      subject: "Xác Thực Tài Khoản",
                      html: resultGenEmailString
                  }
            )
            return{status:true,
            message:"Đã gửi xác nhận, Kiểm tra email"
            }


      }else{
        return{
          status:false,
          message:"Chưa đăng nhập!"
        }
      }


    }
    catch(err){
      return{
        status:false,
        message:"Lỗi hệ thống"
      }
    }
    },

}


