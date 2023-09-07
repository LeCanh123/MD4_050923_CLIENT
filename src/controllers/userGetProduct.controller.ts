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
    getProduct: async function(req:Request, res:Response) {
          let userdata= await userGetProductModel.getProduct()
          console.log(userdata);
          res.status(userdata.status ? 200 : 413).json(userdata)
    }

}