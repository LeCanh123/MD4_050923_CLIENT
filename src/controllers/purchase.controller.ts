import purchaseModel from "../models/purchase.model";
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

      addOrder: async function(req:Request, res:Response) {            
            let addOrder= await purchaseModel.addOrder(req.body);
            console.log(addOrder);
            if(addOrder.status){
                  return res.status(200).json({
                        status:true,
                        message:addOrder.message}
                        )
            }
                  return res.status(201).json({
                        status:false,
                        message:addOrder.message}
                        )
            },
      getHistory: async function(req:Request, res:Response) {   
            let getHistoryResult= await purchaseModel.getHistory(req.body);
            if(getHistoryResult.status){
                  return res.status(200).json({
                        status:true,
                        message:getHistoryResult.message,
                        data:getHistoryResult.data
                        }
                        )
            }
                  return res.status(201).json({
                        status:false,
                        message:getHistoryResult.message}
                        )
            },

        

}