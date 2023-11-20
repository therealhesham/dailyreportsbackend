import { PrismaClient } from "@prisma/client";
import express ,{Express,Request,Response} from "express";

const Prisma = new PrismaClient();


const app :Express=express();



interface DailyReports {
   
    contractorName :string,
    Teams : number,
    location :string,
    TypeOfProject : string,
    details : string,
    date : string,
    notes :string,
    engineerName :string,
    projectManager : string,
    
    }

app.post("/create",async(req:Request,res:Response)=>{
const {contractorName,Teams,location,TypeOfProject,details,date,notes,engineerName,projectManager}:DailyReports=req.body;

const data = await Prisma.dailyReports.create({data:{contractorName,Teams,location,TypeOfProject,details,date,notes,engineerName,projectManager}})


res.send(data)





})





app.get("/dailyreports",async(req:Request,res:Response)=>{






const finder = await Prisma.dailyReports.findMany();
res.send(finder);




})

const appDR = app;

export default appDR;