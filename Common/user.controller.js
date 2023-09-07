import userModel from "../models/user.model";
import mailService from '../services/mail';
import ejs from 'ejs'
import path from 'path'
import { uploadFileToStorage } from "../meobase";
import jwt from '../services/jwt';
import fs from "fs"
const bcrypt = require('bcryptjs');
const saltRounds = 10;

export default {
read: async (req, res) => {
        try {
            let modelRes = await userModel.read()
            res.status(modelRes.status ? 200 : 413).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
create: async (req, res) => {
        let hashpassword="s";
        const salt = await bcrypt.genSalt(saltRounds);
        hashpassword = await bcrypt.hash(req.body.password, salt);

        // console.log("req.body",hashpassword);
        // return
        try {
            let modelRes = await userModel.create({...req.body,password:hashpassword})

            /* Xử lý email */
            console.log(modelRes.status);
            try {
                if (modelRes.status) {
                    let token = jwt.createToken({
                        user_name: req.body.user_name,
                        email: req.body.email
                    }, 300000)

                    if (!token) {
                        return res.status(200).json({
                            message: "Đăng ký thành công, nhưng gửi mail thất bại!"
                        })
                    }
                    let template = await ejs.renderFile(
                        path.join(__dirname, "../templates/email_confirm.ejs"), 
                        {user: req.body, token}
                    )

                    if (modelRes.status) {
                        let mailOptions = {
                            to: req.body.email,
                            subject: "Xác thực email!",
                            html: template
                        }
                        let mailSent = await mailService.sendMail(mailOptions);
                        if(mailSent) {
                            modelRes.message += " Đã gửi email xác thực, vui lòng kiểm tra!"
                        }
                    }
                }
            }catch(err) {
                modelRes.message += " Lỗi trong quá trình gửi mail xác thực, bạn có thể gửi lại email trong phần profile"
            }

            res.status(modelRes.status ? 200 : 413).json(modelRes)
        } catch (err) {
            return res.status(500).json(
                {
                    message: "Lỗi xử lý!"
                }
            )
        }
    },
confirm: async (req, res) => {
        //khi người dùng gửi token qua mail để xác nhận
        let decode = jwt.verifyToken(req.params.token)
        console.log("decode", decode)
        //nếu xác nhận không thành công gửi thông báo hết hiệu lực và return
        if (!decode) {
            return res.send("Email đã hết hiệu lực!")
        }
        //nếu xác nhận thành công gửi lên model để update lại trang thái confirm email
        try {
            let modelRes = await userModel.confirm(decode)
        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
            res.status(modelRes.status ? 200 : 413).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
login: async (req, res) => {
    //    console.log(req.body);
    //    return "kkkkkkkkkk"

       function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
    return false
}
        try {
            let userLogin = await userModel.login(
                {
                    ...req.body,type:ValidateEmail(req.body.email)
                }
            )
            console.log("userLogin",userLogin);
        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
            res.status(userLogin.status ? 200 : 413).json(userLogin)

        } catch (err) {
            // console.log("err",err);
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
tokenlogin: async (req, res) => {
        //    console.log(req.body,"jklk");
        //    return "kkkkkkkkkk"
    

            try {
                let userLogin = await userModel.tokenlogin(req.body.newUser)
                console.log("userLogin",userLogin);
            //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                res.status(userLogin.status ? 200 : 413).json(userLogin)
    
            } catch (err) {
                // console.log("err",err);
                return res.status(500).json(
                    {
                        message: "Bad request !"
                    }
                )
            }
        },
getcategory: async (req, res) => {
            //    console.log(req.body,"jklk");
            //    return "kkkkkkkkkk"
        
    
                try {
                    let getwomen = await userModel.getcategory()
                    // console.log("userLogin",getwomen);
                //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                if(getwomen!=undefined){
                    res.status(200).json(getwomen)
                }else{
                    res.status(201).json("getwomen")
                }
                    
        
                } catch (err) {
                    // console.log("err",err);
                    return res.status(500).json(
                        {
                            message: "Bad request !"
                        }
                    )
                }
            },
getwomen: async (req, res) => {
            //    console.log(req.body,"jklk");
            //    return "kkkkkkkkkk"
        
    
                try {
                    let getwomen = await userModel.getwomen()
                    // console.log("userLogin",getwomen);
                //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                if(getwomen!=undefined){
                    res.status(200).json(getwomen)
                }else{
                    res.status(201).json("getwomen")
                }
                    
        
                } catch (err) {
                    // console.log("err",err);
                    return res.status(500).json(
                        {
                            message: "Bad request !"
                        }
                    )
                }
            },
getmen: async (req, res) => {
                //    console.log(req.body,"jklk");
                //    return "kkkkkkkkkk"
            
        
                    try {
                        let getmen = await userModel.getmen()
                        // console.log("userLogin",getwomen);
                    //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                    if(getmen!=undefined){
                        res.status(200).json(getmen)
                    }else{
                        res.status(201).json("getwomen")
                    }
                        
            
                    } catch (err) {
                        // console.log("err",err);
                        return res.status(500).json(
                            {
                                message: "Bad request !"
                            }
                        )
                    }
                },
getsinglecard:async (req, res) => {
            //    console.log(req.body,"jklk");
            //    return "kkkkkkkkkk"
        
    
                try {
                    let getsinglecard = await userModel.getsinglecard(req.body.cardid)
                    // console.log("userLogin",getsinglecard);
                //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                if(getsinglecard!=undefined){
                    res.status(200).json(getsinglecard)
                }else{
                    res.status(201).json("getsinglecard")
                }
                    
        
                } catch (err) {
                    // console.log("err",err);
                    return res.status(500).json(
                        {
                            message: "Bad request !"
                        }
                    )
                }
            },
addtocart:async (req, res) => {
                //    console.log(req.body,"jklk");
                //    return "kkkkkkkkkk"
            
        
                    try {
                        let addtocart = await userModel.addtocart(req.body.usertoken,req.body.cardid)
                        
                    //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                        if(addtocart.status){
                            res.status(200).json(addtocart)
                        }
                        else{
                            res.status(201).json(addtocart)
                   }
            
                    } catch (err) {
                        // console.log("err",err);
                        return res.status(500).json(
                            {
                                message: "Bad request !"
                            }
                        )
                    }
                },
getcart:async (req, res) => {
                    //    console.log(req.body,"jklk");
                    //    return "kkkkkkkkkk"
                
            
                        try {
                            let addtocart = await userModel.getcart(req.body.usertoken)
                            
                        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                            if(addtocart.status){
                                res.status(200).json(addtocart)
                            }
                            else{
                                res.status(201).json(addtocart)
                       }
                
                        } catch (err) {
                            // console.log("err",err);
                            return res.status(500).json(
                                {
                                    message: "Bad request !"
                                }
                            )
                        }
                    },
deleteuserproduct:async (req, res) => {
    //    console.log(req.body,"jklk");
    //    return "kkkkkkkkkk"


        try {
            let addtocart = await userModel.deleteuserproduct(req.body.usertoken,req.body.id)
            
        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
            if(addtocart.status){
                res.status(200).json(addtocart)
            }
            else{
                res.status(201).json(addtocart)
       }

        } catch (err) {
            // console.log("err",err);
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
adminlogin: async (req, res) => {
        //    console.log(req.body);
        //    return "kkkkkkkkkk"
    
           function ValidateEmail(mail) 
    {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return true
      }
        return false
    }
            try {
                let userLogin = await userModel.adminlogin(
                    {
                        ...req.body,type:ValidateEmail(req.body.email)
                    }
                )
                console.log("userLogin",userLogin);
            //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                res.status(userLogin.status ? 200 : 413).json(userLogin)
    
            } catch (err) {
                // console.log("err",err);
                return res.status(500).json(
                    {
                        message: "Bad request !"
                    }
                )
            }
        },
addnewproduct:async (req, res) => {
    //    console.log(req.body);
    //    return "kkkkkkkkkk"

            try{
                let addnewproduct1 = await userModel.addnewproduct(req.body)
                if(addnewproduct1.status){
                    res.status(200).json(addnewproduct1.message)
                }else{
                    res.status(201).json(addnewproduct1.message)
                }

            }
            catch(err){
                res.status(201).json({
                    message:"Hệ thống bận thử lại sau"
                })
            }
    },
admingetmen:async (req, res) => {
    //    console.log(req.body,"jklk");
    //    return "kkkkkkkkkk"


        try {
            let getwomen = await userModel.admingetmen()
            // console.log("userLogin",getwomen);
        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
        if(getwomen!=undefined){
            res.status(200).json(getwomen)
        }else{
            res.status(201).json("getwomen")
        }
            

        } catch (err) {
            // console.log("err",err);
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
admingetwomen:async (req, res) => {
    //    console.log(req.body,"jklk");
    //    return "kkkkkkkkkk"


        try {
            let getwomen = await userModel.admingetwomen()
            // console.log("userLogin",getwomen);
        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
        if(getwomen!=undefined){
            res.status(200).json(getwomen)
        }else{
            res.status(201).json("getwomen")
        }
            

        } catch (err) {
            // console.log("err",err);
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
admingetuser:async (req, res) => {
        //    console.log(req.body,"jklk");
        //    return "kkkkkkkkkk"
    
    
            try {
                let getwomen = await userModel.admingetuser()
                // console.log("userLogin",getwomen);
            //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
            if(getwomen!=undefined){
                res.status(200).json(getwomen)
            }else{
                res.status(201).json("getwomen")
            }
                
    
            } catch (err) {
                // console.log("err",err);
                return res.status(500).json(
                    {
                        message: "Bad request !"
                    }
                )
            }
        },
admineditproduct:async (req, res) => {
    //    console.log(req.files,"Aaaaaaaaaaaaaaaaaaaaaa");
    //    console.log(req.body,"Aaaaaaaaaaaaaaaaaaaaaa");
    //    return "kkkkkkkkkk"

       let productinfo={...req.body,image:"",img1:"",img2:"",img3:"",img4:"",}
       let avatarProcess,avatarProcess1,avatarProcess2,avatarProcess3,avatarProcess4
       if(req.files.image?req.files.image[0]:undefined){
        avatarProcess = await uploadFileToStorage(req.files.image[0], "products", fs.readFileSync(req.files.image[0].path));
       }
       if(req.files.img1?req.files.img1[0]:undefined){
        avatarProcess1 = await uploadFileToStorage(req.files.img1[0], "products", fs.readFileSync(req.files.img1[0].path));
        
       }
       if(req.files.img2?req.files.img2[0]:undefined){
        avatarProcess2 = await uploadFileToStorage(req.files.img2[0], "products", fs.readFileSync(req.files.img2[0].path));
        
       }
       if(req.files.img3?req.files.img3[0]:undefined){
        avatarProcess3 = await uploadFileToStorage(req.files.img3[0], "products", fs.readFileSync(req.files.img3[0].path));
        
       }
       if(req.files.img4?req.files.img4[0]:undefined){
        avatarProcess4 = await uploadFileToStorage(req.files.img4[0], "products", fs.readFileSync(req.files.img4[0].path));
        
       }
       productinfo.image = avatarProcess;
       productinfo.img1 = avatarProcess1;
       productinfo.img2 = avatarProcess2;
       productinfo.img3 = avatarProcess3;
       productinfo.img4 = avatarProcess4;

if(productinfo.image!=undefined){fs.unlink(req.files.image[0].path, (err) => {})}
if(productinfo.img1!=undefined){fs.unlink(req.files.img1[0].path, (err) => {})}
if(productinfo.img2!=undefined){fs.unlink(req.files.img2[0].path, (err) => {})}
if(productinfo.img3!=undefined){fs.unlink(req.files.img3[0].path, (err) => {})}
if(productinfo.img4!=undefined){fs.unlink(req.files.img4[0].path, (err) => {})}
       
    //    req.files.splice(0, 1);
        // console.log("productinfo",productinfo);

try{
    let admineditproduct = await userModel.admineditproduct(productinfo)
    console.log("admineditproduct",admineditproduct);
    return res.status(200).json({
        status:true,
        data:admineditproduct
    })
}
catch(err){
    return res.status(200).json({
        status:false,
       
    })
    console.log("admineditproduct control err");

}       


    },
adminaddproduct:async (req, res) => {
        //    console.log(req.files,"Aaaaaaaaaaaaaaaaaaaaaa");
        //    console.log(req.body,"Aaaaaaaaaaaaaaaaaaaaaa");
        //    return "kkkkkkkkkk"
    
           let productinfo={...req.body,image:"",img1:"",img2:"",img3:"",img4:"",}
           let avatarProcess,avatarProcess1,avatarProcess2,avatarProcess3,avatarProcess4
           if(req.files.image?req.files.image[0]:undefined){
            avatarProcess = await uploadFileToStorage(req.files.image[0], "products", fs.readFileSync(req.files.image[0].path));
           }
           if(req.files.img1?req.files.img1[0]:undefined){
            avatarProcess1 = await uploadFileToStorage(req.files.img1[0], "products", fs.readFileSync(req.files.img1[0].path));
            
           }
           if(req.files.img2?req.files.img2[0]:undefined){
            avatarProcess2 = await uploadFileToStorage(req.files.img2[0], "products", fs.readFileSync(req.files.img2[0].path));
            
           }
           if(req.files.img3?req.files.img3[0]:undefined){
            avatarProcess3 = await uploadFileToStorage(req.files.img3[0], "products", fs.readFileSync(req.files.img3[0].path));
            
           }
           if(req.files.img4?req.files.img4[0]:undefined){
            avatarProcess4 = await uploadFileToStorage(req.files.img4[0], "products", fs.readFileSync(req.files.img4[0].path));
            
           }
           productinfo.image = avatarProcess;
           productinfo.img1 = avatarProcess1;
           productinfo.img2 = avatarProcess2;
           productinfo.img3 = avatarProcess3;
           productinfo.img4 = avatarProcess4;
    
    if(productinfo.image!=undefined){fs.unlink(req.files.image[0].path, (err) => {})}
    if(productinfo.img1!=undefined){fs.unlink(req.files.img1[0].path, (err) => {})}
    if(productinfo.img2!=undefined){fs.unlink(req.files.img2[0].path, (err) => {})}
    if(productinfo.img3!=undefined){fs.unlink(req.files.img3[0].path, (err) => {})}
    if(productinfo.img4!=undefined){fs.unlink(req.files.img4[0].path, (err) => {})}
           
        //    req.files.splice(0, 1);
            // console.log("productinfo",productinfo);
    
    try{
        let adminaddproduct = await userModel.adminaddproduct(productinfo)
        console.log("admineditproduct",adminaddproduct);
        res.status(200).json({
            status:true,
            data:adminaddproduct
        })
    }
    catch(err){
        res.status(200).json({
            status:false,
            data:adminaddproduct
        })
        console.log("admineditproduct control err");
    }       
  
        },
increaseproduct:async (req, res) => {
        //    console.log(req.body,"jklk");
        //    return "kkkkkkkkkk"
    
    
            try {
                let addtocart = await userModel.increaseproduct(req.body)
                
            //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
                if(addtocart.status){
                    res.status(200).json(addtocart)
                }
                else{
                    res.status(201).json(addtocart)
           }
    
            } catch (err) {
                // console.log("err",err);
                return res.status(500).json(
                    {
                        message: "Bad request !"
                    }
                )
            }
        }, 
admindeleteproduct: async (req, res) => {
    //    console.log(req.body,"jklk");
    //    return "kkkkkkkkkk"


        try {
            let addtocart = await userModel.admindeleteproduct(req.body.admintoken,req.body.id)
            
        //nếu sửa thành công gửi status 200 và gửi dữ liệu về người dùng
            if(addtocart.status){
                res.status(200).json(addtocart)
            }
            else{
                res.status(201).json(addtocart)
       }

        } catch (err) {
            // console.log("err",err);
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },  
}

