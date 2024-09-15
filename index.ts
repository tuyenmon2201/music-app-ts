import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3003;

import Topic from "./models/topic.model";

app.set("views", "./views");
app.set("view engine", "pug");

import { connectDatabase } from "./config/database";
connectDatabase();

app.get("/topics", async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false
    });

    console.log(topics);
    
    res.render("client/pages/topics/index");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})