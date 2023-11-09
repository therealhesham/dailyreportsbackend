import {PrismaClient} from "@prisma/client";

import { Request , Response } from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import express , {Express} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({path:__dirname+"./.env"});
const  prisma = new PrismaClient();
const app : Express =express()


const userSchema = z.object({username:z.string(),password:z.string(),RepeatPassword:z.string(),projects:z.string().array(),isMatched:z.string()}).superRefine(
    ({password,RepeatPassword},ctx)=>{

if(password!=RepeatPassword){

    ctx.addIssue({code:"custom",message:"passwords ara not matching, please repeat"})
}
    
})

export interface userdetails{

username : string,
password : string,
RepeatPassword : string,
Projects : string[]





}

app.post('/register',async(req:Request,res:Response)=>{
    console.log("hello")
try {

    const body  : userdetails= req.body;

const result=userSchema.safeParse(req.body);

if(!result.success){

res.send(result.error)

}
else{
  
const salted = bcrypt.genSaltSync(10)
const hashpassword = bcrypt.hashSync(body.password,salted)
const hashedrepeat = bcrypt.hashSync(body.RepeatPassword,salted)


    const data = await prisma.engineers.create({data:{username:body.username,password:hashpassword,RepeatPassword:hashedrepeat,Projects:body.Projects}})
    
// const token = jwt.sign(data,process.env.secret)
res.send()

}

        
} catch (error) {
    res.send(error)
}













})


const apps = app;
export default apps