import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import methodOverride from "method-override";
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3003;

// method-override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

import { routesClient } from "./routes/client/index.route";
import { routesAdmin } from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import path from "path";

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

routesAdmin(app);

app.use(express.static("public"));

import { connectDatabase } from "./config/database";
connectDatabase();

routesClient(app);

app.get("/topics", )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})