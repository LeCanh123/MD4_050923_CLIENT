import adminUserModel from "../models/adminUser.model";
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
    getListUser: async function(req:Request, res:Response) {
        console.log(req.body.category);
        
    //
    let getListUserResult= await adminUserModel.getListUser(req.body.category)
            if(getListUserResult.status){
                return res.status(200).json({
                    status:true,
                    message:getListUserResult.message,
                    data:getListUserResult.data
                }) 
            }else{
                return res.status(201).json({
                    status:false,
                    message:getListUserResult.message,
                    data:[]
                }) 
            }
    },

}