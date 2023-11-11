import express , {Express} from "express";
import dotenv from "dotenv";
import apps from "./users/register";
import appDR from "./dailyreports/createdailyreports";

dotenv.config();

const app : Express =express();
app.use(express.json());
app.use(apps);
app.use(appDR);
const port = process.env.PORT




app.listen(port || 3000 , () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });



  export default app;
