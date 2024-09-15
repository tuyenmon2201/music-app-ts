import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { Express } from "express";

export const routesClient = (app: Express) => {

    app.use("/topics", topicRoute);

    app.use("/songs", songRoute);

}