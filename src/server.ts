import express from "express"
import dotenv from "dotenv"
dotenv.config()
// import './entity/typeorm';
import cors from "cors"
//npm i --save-dev @types/cors
import { Googlelogin } from "./firebase"
import bodyParser from "body-parser"
import { PrismaClient } from '@prisma/client'
import genEmailString from "./services/template/emailConfirm"
import mailService from "./services/mail/index"
import text from "./text"

const prisma = new PrismaClient()
  
// cors();
const server =express();
server.use(cors());
server.use(bodyParser.json());


server.use(express.json());

server.use('/google', async (req, res) => {
  res.send('Hello Anh  Cảnh 111112!');
  let result = await Googlelogin();
  res.send(Googlelogin)
  console.log("result,",result);
  
});

server.use('/authengoogle', async (req, res) => {
 let key="AIzaSyB1uLTbSCBMyI-amXp2oqsMMd_cl_BqIiA";
 let token="eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTMOqIE5n4buNYyBD4bqjbmgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZDA4aXlXS1pzbGxsZUJHSzBZMUN4MldJTzBRbEpwYlVfajJzZkt6MFJnalE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdXBoaW5oLTc5ODBiIiwiYXVkIjoidXBoaW5oLTc5ODBiIiwiYXV0aF90aW1lIjoxNjkzMjE2Nzg0LCJ1c2VyX2lkIjoiMWNBTzhIQnZGTGM4S3lpSU0zaEw0dURXbVVxMSIsInN1YiI6IjFjQU84SEJ2RkxjOEt5aUlNM2hMNHVEV21VcTEiLCJpYXQiOjE2OTMyMTY3ODQsImV4cCI6MTY5MzIyMDM4NCwiZW1haWwiOiJuZ29jY2FuaDEyNDkzN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjU3OTIzMzI3NzY1NDU1OTkwOCJdLCJlbWFpbCI6WyJuZ29jY2FuaDEyNDkzN0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.kjr_iCvaDb7FULVoTiJQau2rPTM1LAP9Gpks3zhQpw3CrwUSjUFocunQNJ6AGNFwYLm79c2TN4LklKwdgbhDbxnZdpUO2dK2_c3QijMIwIFm9k6fiHsjUeApGFRyh9MuffzHQCAU4xKr-Xw1QBJIUJifHOh85M9bYGtBEih5PFz-GSRFv2ZISf7X-SZoa0BPhu54_3H3H6qxwjeXUwRtgIY68lC4bO6CQ-yVC-rQxhywIxqPFoKb2SOyFjtfbUuawz8eU3Oe17DnnDzn4immFuqmiBmw3979w3qnrYH0-fbpaa3gjjZIUuceCx8GyU31wTW7uoNQ4nHBRFGB7NQ_Sg"
 try{
  let result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,{
    idToken:token
  })
  console.log("result,",result);
res.send(JSON.stringify(result))
 }
 catch(err){
console.log("err",err);

 } 

  // res.send(Googlelogin)
  
  
});


// server.get('/', (req, res) => {
//     res.send('Hello Anh  Cảnh !');
//   });

//   server.get('/createuser', async (req, res) => {
    
//       const user = await prisma.user.create({
//         data: {
        
//           email: '[{email1:Anhcanhpro@prisma.io},{email2:Anhcanhpro2@gâmil.io}]',
//         },
//       })
//       console.log(user)
//       res.status(200).json(user)
    
//   });


  server.get('/getuser', async (req, res) => {
    
      const user = await prisma.user.findMany()
      console.log(user)
      res.status(200).json(user)
    
  });



  server.get('/testmail', async (req, res) => {

    let a=genEmailString({
      productName:text("vi").hello,
      productUrl:"canh123.lambogini",
      receiveName:"ngoccanh124937@gmail.com",//email người nhận
      confirmLink:"tiktok.com"

    }
 
    )
    console.log(a,"kkkk");
    
    res.send(a)

    mailService.sendMail({
    to: "ngoccanh124937@gmail.com",
    subject: "Anh Cảnh Nè Cưng",
    html: a

    })





    

});


  import apiRouter from "./apis/index.api";
import axios from "axios"
  server.use("/apis", apiRouter);

server.listen(process.env.SERVER_PORT,()=>{
    console.log("Server on port http://localhost:"+`${process.env.SERVER_PORT}`);
    
})
