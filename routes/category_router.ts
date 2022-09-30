import express, {Request, Response} from "express";
import * as categoryModel from "../models/category";
import {Category} from "../types/category";

export const categoryRouter = express.Router();

categoryRouter.post("/", async (req: Request, res: Response) => {
    const newCategory: Category = req.body;
    categoryModel.create(newCategory, (err: Error, categoryId: number) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
  
      res.status(200).json({"categoryId": categoryId});
    });
});

categoryRouter.get("/", async (req: Request, res: Response) => {
    categoryModel.findAll((err: Error, orders: Category[]) => {
      if (err) {
        return res.status(500).json({"errorMessage": err.message});
      }
  
      res.status(200).json({"data": orders});
    });
});