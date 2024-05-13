import { Router } from "express";
import { createContainer } from "../controllers/orchestration.controller";
import { asyncHandler } from "../utils/asynchandler";

const containersRouter = Router();

containersRouter.post("/", asyncHandler(createContainer));

export default containersRouter;