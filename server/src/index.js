import express from "express";
import logger from "morgan"
import cookieParser from "cookie-parser";
import Router from "./routes/index.js";
import errorMiddleware from "./utils/error-handler.js";
import { notFound } from "./utils/response.util.js";

const app = express();


app.use(logger("tiny"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.set("trust proxy", true);


app.use("/api/v1", Router)


app.use((req, res)=> {
    return notFound(res, {
        ip: req.ip,
        method: req.method,
        url: `${req.protocol}://${req.get("host")}${req.originalUrl}`
    })
})

app.use(errorMiddleware);


export default app;