import { NextFunction, Request, Response } from "express";
import orchestrationService from "../services/orchestration.service";

export const createContainer = async (req: Request, res: Response, next: NextFunction) => {
    const image = req.body.image as string;

    const response = await orchestrationService.create({ image });

    next(response);
}
