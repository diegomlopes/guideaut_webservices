import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {categoryRouter} from "./routes/category_router";
import {authenticationRouter} from "./routes/authentication_router";
import {recomendationRouter} from "./routes/recomendation_router";
import cors from 'cors';

const app = express();
const allowedOrigins = ['http://localhost:51695/'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(express.json());

dotenv.config();

app.use(bodyParser.json());
app.use("/categories", categoryRouter);
app.use("/authentication", authenticationRouter);
app.use("/recomendation", recomendationRouter);

app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});
