import { topicRoute } from "./topic.route";
import { Express } from "express";

export const routesClient = (app: Express) => {

    app.use("/topics", topicRoute);

}