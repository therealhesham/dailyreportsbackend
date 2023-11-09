import express , {Express} from "express";
import dotenv from "dotenv";

dotenv.config();


const app : Express =express();

const port = process.env.PORT




app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });



  export default app;
