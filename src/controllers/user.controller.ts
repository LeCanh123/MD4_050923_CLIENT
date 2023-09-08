import UserModule from "../models/user.model"

import mailService from '../services/mail';
import ejs from 'ejs'
import path from 'path'
import { uploadFileToStorage } from "../meobase";
import jwt from '../services/jwt';
import fs from "fs"
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Prisma
import { Request,Response } from "express";
import userModel,{newUser,address} from "../models/user.model";

export default {
   register:async function(req:Request,res:Response){
      let user:newUser={
                        email:"string721255",
                        username:"string",
                        password:"string",
                        firstname:"string",
                        lastname:"string",
                        avatar:"string",
                        address:[{province:"1234"}]
      }
      let result =await userModel.register(user)
      console.log(result);
      

   }
}