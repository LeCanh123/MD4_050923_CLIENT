import adminProductModel from "../models/adminProduct.model";
import { UserType } from "../models/user.model";
import { Request,Response } from "express";
// import mailService from '../services/mail';
import ejs from 'ejs'
import path from 'path'
import { uploadFileToStorage } from "../uploadfirebase";
import jwt from '../services/jwt';
import fs from "fs"
const bcrypt = require('bcryptjs');
const saltRounds = 10;


export default {
    //category
    addCategory: async function(req:Request, res:Response) {
        console.log(req.body.category);
        
    //
    let addCategoryResult= await adminProductModel.addCategory(req.body.category)
            if(addCategoryResult.status){
                return res.status(200).json({
                    status:true,
                    message:addCategoryResult.messsage,
                    data:"null"
                }) 
            }else{
                return res.status(201).json({
                    status:false,
                    message:addCategoryResult.messsage,
                    data:"null"
                }) 
            }

        console.log(addCategoryResult);
        res.status(addCategoryResult.status ? 200 : 413).json(addCategoryResult)
    },
    getCategory: async function(req:Request, res:Response) {
          let categoryData= await adminProductModel.getCategory()
          console.log(categoryData);
          if(categoryData.status){
            res.status(200).json({
                status:true,
                message:categoryData.messsage,
                data:categoryData.data
            }) 
        }else{
            res.status(201).json({
                status:false,
                message:categoryData.messsage,
                data:"null"
            }) 
        }
    },
    deleteCategory: async function(req:Request, res:Response) {
        console.log("req.body deleteCategory",req.body);
        
        let categoryData= await adminProductModel.deleteCategory(req.body)
        console.log(categoryData);
        if(categoryData.status){
          res.status(200).json({
              status:true,
              message:categoryData.messsage,
            //   data:categoryData.data
          }) 
      }else{
          res.status(201).json({
              status:false,
              message:categoryData.messsage,
              data:"null"
          }) 
      }
    },
    //product
    addProduct: async function(req:any, res:Response) {
 
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
       
console.log("productinfo",productinfo);

    //    (req.files as any).splice(0, 1);
       if (Array.isArray(req.files)) {
        req.files.splice(0, 1);
      }
        console.log("productinfo",productinfo);

try{
    let admineditproduct = await adminProductModel.addProduct(productinfo)
    // console.log("admineditproduct",admineditproduct);
    if(admineditproduct.status){
        return res.status(200).json({
            status:true,
            message:admineditproduct.messsage,
            data:"null"
        }) 
    }else{
        return res.status(201).json({
            status:false,
            message:admineditproduct.messsage,
            data:"null"
        }) 
    }
}
catch(err){
    return res.status(201).json({
        status:false,
        message:"Lỗi hệ thống",
        data:"null"
    }) 

}  
    
    },
    getProduct: async function(req:Request, res:Response) {
        //
        let getProductResult= await adminProductModel.getProduct(req.body)
        if(getProductResult.status){
            return res.status(200).json({
                status:true,
                message:getProductResult.message,
                data:getProductResult.data
            }) 
        }else{
            return res.status(201).json({
                status:false,
                message:getProductResult.message,
                data:[]
            }) 
        }
    },
    editProduct: async function(req:Request, res:Response) {
        //
        let editProductResult= await adminProductModel.editProduct(req.body)
        if(editProductResult.status){
            return res.status(200).json({
                status:true,
                message:editProductResult.message,
                data:"null"
            }) 
        }else{
            return res.status(201).json({
                status:false,
                message:editProductResult.message,
                data:"null"
            }) 
        }
    },
    deleteProduct: async function(req:Request, res:Response) {
        //
        let deleteProductResult= await adminProductModel.deleteProduct(req.body)

            if(deleteProductResult.status){
                return res.status(200).json({
                    status:true,
                    message:deleteProductResult.message,
                    data:"null"
                }) 
            }else{
                return res.status(201).json({
                    status:false,
                    message:deleteProductResult.message,
                    data:"null"
                }) 
            }
    },
    productGetCategory: async function(req:Request, res:Response) {

        let categoryData= await adminProductModel.productGetcategory();
        console.log(categoryData);
        if(categoryData.status){
          res.status(200).json({
              status:true,
              message:categoryData.messsage,
              data:categoryData.data
          }) 
      }else{
          res.status(201).json({
              status:false,
              message:categoryData.messsage,
              data:{}
          }) 
      }
    },

    //test
    test: async function(req:Request, res:Response) {

        let categoryData= await adminProductModel.test();
        console.log(categoryData);
        res.status(200).json(categoryData) 

        // if(categoryData.status){
        //   res.status(200).json({
        //       status:true,
        //       message:categoryData.messsage,
        //       data:categoryData.data
        //   }) 
        // }else{
        //   res.status(201).json({
        //       status:false,
        //       message:categoryData.messsage,
        //       data:{}
        //   }) 
        // }
    },
}