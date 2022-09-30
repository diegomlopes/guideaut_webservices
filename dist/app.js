"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const category_router_1 = require("./routes/category_router");
const authentication_router_1 = require("./routes/authentication_router");
const recomendation_router_1 = require("./routes/recomendation_router");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:51695/'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
dotenv.config();
app.use(bodyParser.json());
app.use("/categories", category_router_1.categoryRouter);
app.use("/authentication", authentication_router_1.authenticationRouter);
app.use("/recomendation", recomendation_router_1.recomendationRouter);
app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});
