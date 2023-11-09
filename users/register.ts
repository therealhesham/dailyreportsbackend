import {PrismaClient} from "@prisma/client";
import app from "../app";
import { Request , Response } from "express";
import {z} from "zod";
import bcrypt from "bcrypt";

const  prisma = new PrismaClient();


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
try {

    const body  : userdetails= req.body;

const result=userSchema.safeParse(req.body);

if(!result.success){

res.send(result.error)

}
else{
  


    const data = await prisma.engineers.create({data:{username:body.username,password:body.password,RepeatPassword:body.RepeatPassword,Projects:body.Projects}})
    



}

        
} catch (error) {
    
}













})