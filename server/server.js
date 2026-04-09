import dotenv from "dotenv"
dotenv.config({quiet: true})
import app from "./src/index.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT, ()=> {
        console.log("first")
    })
}

startServer();