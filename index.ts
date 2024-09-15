import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3003;

import { routesClient } from "./routes/client/index.route";

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

import { connectDatabase } from "./config/database";
connectDatabase();

routesClient(app);

app.get("/topics", )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})