import express , {Express} from "express";
import dotenv from "dotenv";
import apps from "./users/register";

dotenv.config();

const app : Express =express();
app.use(express.json())
app.use(apps)
const port = process.env.PORT




app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });



  export default app;
