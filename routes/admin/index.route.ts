import { systemConfig } from "../../config/system";
import { dashboardRoute } from "./dashboard.route";
import { songRoute } from "./song.route";
import { topicRoute } from "./topic.route";
import { Express } from "express";

export const routesAdmin = (app: Express) => {
    const PATH = `/${systemConfig.prefixAdmin}`;

    app.use(`${PATH}/dashboard`, dashboardRoute);

    app.use(`${PATH}/topics`, topicRoute);

    app.use(`${PATH}/songs`, songRoute);

}