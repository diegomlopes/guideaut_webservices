import express, {Request, Response} from "express";
import * as recomendationModel from "../models/recomendation";
import {Recomendation} from "../types/recomendation";

export const recomendationRouter = express.Router();

recomendationRouter.post("/", async (req: Request, res: Response) => {
    const newRecomendation: Recomendation = req.body;
    recomendationModel.create(newRecomendation, (err: Error, categoryId: number) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
  
      res.status(200).json({"categoryId": categoryId});
    });
});