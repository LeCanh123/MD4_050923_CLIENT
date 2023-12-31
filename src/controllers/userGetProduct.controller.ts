import userGetProductModel from "../models/userGetProduct.model";
import { UserType } from "../models/user.model";
import { Request,Response } from "express";
import mailService from '../services/mail';
import ejs from 'ejs'
import path from 'path'
import { uploadFileToStorage } from "../meobase";
import jwt from '../services/jwt';
import fs from "fs"
const bcrypt = require('bcryptjs');
const saltRounds = 10;


export default {
      getMenProduct: async function(req:Request, res:Response) {
            let userdata= await userGetProductModel.getMenProduct()
            res.status(userdata.status ? 200 : 413).json(userdata)
            },
      addToCart: async function(req:Request, res:Response) {


            
            let addToCartResult= await userGetProductModel.addToCart(req.body);
            if(addToCartResult.status){
                  return res.status(200).json({
                        status:true,
                        message:addToCartResult.message}
                        )
            }
                  return res.status(201).json({
                        status:false,
                        message:addToCartResult.message}
                        )
            },
      getCart: async function(req:Request, res:Response) {
            let cartData= await userGetProductModel.getCart(req.body.token)
            res.status(200).json(cartData)
            },
      deleteProduct: async function(req:Request, res:Response) {
                  let deleteProductResult= await userGetProductModel.deleteProduct(req.body)
                  if(deleteProductResult.status){
                        return res.status(200).json({
                              status:true,
                              message:deleteProductResult.message}
                              )
                  }
                        return res.status(201).json({
                              status:false,
                              message:deleteProductResult.message}
                              )
            },
      changeQuantity: async function(req:Request, res:Response) {
            let changeQuantityResult= await userGetProductModel.changeQuantity(req.body)
            if(changeQuantityResult.status){
                  return res.status(200).json({
                        status:true,
                        message:changeQuantityResult.message}
                        )
            }
                  return res.status(201).json({
                        status:false,
                        message:changeQuantityResult.message}
                        )
      },
      getCategory: async function(req:Request, res:Response) {

            let categoryData= await userGetProductModel.getcategory();
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
      getProductByCategory: async function(req:Request, res:Response) {
      let categoryData= await userGetProductModel.getProductByCategory(req.body.category);
      if(categoryData.status){
            res.status(200).json({
            status:true,
            message:categoryData.message,
            data:categoryData.data
            }) 
      }else{
            res.status(201).json({
            status:false,
            message:categoryData.message,
            data:[]
            }) 
      }
      },


        

}