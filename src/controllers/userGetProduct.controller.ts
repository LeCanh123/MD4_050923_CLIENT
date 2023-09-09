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
            console.log(userdata);
            res.status(userdata.status ? 200 : 413).json(userdata)
            },
      addToCart: async function(req:Request, res:Response) {


            
            let addToCartResult= await userGetProductModel.addToCart(req.body);
            console.log(addToCartResult);
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
            console.log("vào get cart");
            
            let cartData= await userGetProductModel.getCart(req.body.token)
            console.log(cartData);
            res.status(200).json(cartData)
            },
      deleteProduct: async function(req:Request, res:Response) {
                  console.log("vào get cart");
                  
                  let deleteProductResult= await userGetProductModel.deleteProduct(req.body)
                  console.log(deleteProductResult);
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
            console.log("vào changeQuantity");
                  
            let changeQuantityResult= await userGetProductModel.changeQuantity(req.body)
            console.log(changeQuantityResult);
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


}