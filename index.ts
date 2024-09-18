import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3003;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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