import { Router } from "express";
import containersRouter from "./container.route";

const rootRouter = Router();

rootRouter.use("/containers", containersRouter);

export default rootRouter;