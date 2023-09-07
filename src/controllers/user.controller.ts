import UserModel from "../models/user.model"
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
  getUser: async function(req:Request, res:Response) {
        let userdata= await UserModel.getUser()
        console.log(userdata);
        res.status(userdata.status ? 200 : 413).json(userdata)
  },
  addUser: async (req:Request, res:Response) => {
    // http://localhost:4000/apis/v1/user
    //   {
    //     // "email":"Canh",
    //     "username":"Anh Cảnh Điệp Viên1",
    //     "email":"ngoccanh124937@gmail.com",
    //     "firstname":"firstName",
    //     "lastname":"lastName",
    //     "password":"passWord"
    //     // "password":"sss",
    //     // "avatar":"sjsjjs"
    // }



        console.log("req.body",req.body);
        
      let hashpassword="s";
      const salt = await bcrypt.genSalt(saltRounds);
      hashpassword = await bcrypt.hash(req.body.password, salt);

      let formattedDate = new Date();

      let newUser:UserType={
        username:req.body.username,
        email:req.body.email,
        emailconfirm:"null",
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:hashpassword,
        avatar:"null",
        createat:formattedDate,
        block:"null",
      }
      // console.log("req.body",hashpassword);
      // return
      try {
          let modelRes = await UserModel.addUser(newUser)

          /* Xử lý email */
          console.log(modelRes);

          res.status((modelRes as any).status ? 200 : 413).json(modelRes)
      } catch (err) {
        console.log("errrrrr",err);
        
          return res.status(500).json(
              {
                  message: "Lỗi xử lý!"
              }
          )
      }
  },
  googleAddUser: async (req:Request, res:Response) => {
    // http://localhost:4000/apis/v1/user
    //   {
    //     // "email":"Canh",
    //     "username":"Anh Cảnh Điệp Viên1",
    //     "email":"ngoccanh124937@gmail.com",
    //     "firstname":"firstName",
    //     "lastname":"lastName",
    //     "password":"passWord"
    //     // "password":"sss",
    //     // "avatar":"sjsjjs"
    // }
      console.log("req.body",req.body);
      let hashpassword="s";
      const salt = await bcrypt.genSalt(saltRounds);
      hashpassword = await bcrypt.hash(req.body.password, salt);

      let formattedDate = new Date();

      let newUser:UserType={
        username:req.body.username,
        email:req.body.email,
        emailconfirm:"true",
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:hashpassword,
        avatar:"null",
        createat:formattedDate,
        block:"null",
      }
      try {
          let modelRes = await UserModel.googleAddUser(newUser)

          /* Xử lý email */
          console.log(modelRes);
          res.status((modelRes as any).status ? 200 : 413).json(modelRes)
      } catch (err) {
        // console.log("errrrrr",err);
          return res.status(500).json(
              {
                  message: "Lỗi xử lý!"
              }
          )
      }
  },
  deleteUser:async function(req:Request, res:Response) {
      console.log(req.params,"req.params");
      
      let userdata= await UserModel.deleteUser(Number(req.params.id));
      console.log(userdata);
      
      res.send(userdata)
  },
  confirmUser:async function(req:Request, res:Response) {
      console.log("req.params",req.params);
      let confirmResult= await UserModel.confirmUser(req.params.token);
      // res.status((confirmResult as any).status ? 200 : 413).json(confirmResult)
      // console.log(confirmResult);
      const filePath = path.join(__dirname, './../services/template/returnHomePage.ejs');
      console.log(filePath);
      res.render(filePath,{message:confirmResult.message})
  },
  userLogin:async function(req:Request, res:Response) {
    console.log("req.params",req.body);
    let loginResult= await UserModel.userLogin(req.body);
    console.log(loginResult);
    
    res.status((loginResult as any).status ? 200 : 413).json(loginResult)
    // // console.log(confirmResult);
    // const filePath = path.join(__dirname, './../services/template/returnHomePage.ejs');
    // console.log(filePath);
    // res.render(filePath,{message:confirmResult.message})
  },
  userGetChangeInfo:async function(req:Request, res:Response) {
    console.log("vào userGetChangeInfo");
    
    let getInfoResult=await UserModel.userGetChangeInfo(String(req.body.token));
    console.log("getInfoResult",getInfoResult);
    // return getInfoResult
    if(getInfoResult.status){
      return res.status(200).json({
        status:true,
        data:getInfoResult.data,
      })
    }

    res.status(201).json({
      status:false,
      message:getInfoResult.message
    })
  },
  userChangeInfo:async function(req:Request, res:Response) {
    console.log(req.body);
    let result=await UserModel.userChangeInfo(req.body);
    if(result.status){
    res.status(200).json({status:true,message:result.message})
    }else{
    res.status(201).json({status:false,message:result.message})
    }
    
  },
  userChangeConfirm:async function(req:Request, res:Response) {
    console.log("userChangeConfirm",req.body);
    let result=await UserModel.userChangeConfirm(req.body.token);
    console.log("userChangeConfirm",result);
    if(result.status){
      return res.status(200).json({
        status:true,
        message:result.message
      })
    }else{
      return res.status(201).json({
        status:false,
        message:result.message
      })

    }
  },
}