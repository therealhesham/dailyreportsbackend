import {PrismaClient} from "@prisma/client";

import { Request , Response } from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import express , {Express} from "express";
import jwt,{ Secret }   from "jsonwebtoken";

const  prisma = new PrismaClient();
const app : Express =express()


const userSchema = z.object({username:z.string(),password:z.string(),RepeatPassword:z.string(),projects:z.string().array()}).superRefine(
    ({password,RepeatPassword},ctx)=>{

if(password!=RepeatPassword){

    ctx.addIssue({code:"custom",message:"passwords ara not matching, please repeat"})
}
    
})

 interface userdetails{

username : string,
password : string,
RepeatPassword : string,
Projects : string[]





}

app.post('/register',async(req:Request,res:Response)=>{
    console.log(process.env.secret)
try {

    const body  : userdetails= req.body;

const result=userSchema.safeParse(req.body);

if(!result.success) return res.send(result.error.errors[0].message);


  
const salted = bcrypt.genSaltSync(10)
const hashpassword = bcrypt.hashSync(body.password,salted)
const hashedrepeat = bcrypt.hashSync(body.RepeatPassword,salted)


    const data = await prisma.engineers.create({data:{username:body.username,password:hashpassword,RepeatPassword:hashedrepeat,Projects:body.Projects}})
    
const token = jwt.sign(body,`${process.env.secret}`,{expiresIn:60*60})
res.header("token",token)
res.send(data)



        
} catch (error) {
    res.send(error)
}













})


const apps = app;
export default apps