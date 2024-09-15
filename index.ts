import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3003;

app.get("/topics", (req: Request, res: Response) => {
    res.send("Chủ đề bài hát!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})