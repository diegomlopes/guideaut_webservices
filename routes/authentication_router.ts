import express, {Request, Response} from "express";
import * as authenticationModel from "../models/authentication";
import {Authentication} from "../types/authentication";

export const authenticationRouter = express.Router();

authenticationRouter.post("/signup", async (req: Request, res: Response) => {
    const newAthentication: Authentication = req.body;
    authenticationModel.signup(newAthentication, (err: Error, authentication: Authentication) => {
        if (err) {
            return res.status(500).json({"errorMessage": err});
        } else {
            return res.status(200).json({"data": authentication});
        }
    });
});

authenticationRouter.post("/signin", async (req: Request, res: Response) => {
    const newAthentication: Authentication = req.body;
    authenticationModel.signin(newAthentication, (err: Error, authentication: Authentication) => {
      if (err) {
        return res.status(500).json({"errorMessage": err});
      } else {
        return res.status(200).json({"data": authentication});
      }

    });
});