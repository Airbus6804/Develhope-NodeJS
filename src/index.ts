import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";
import dotenv from "dotenv";
import * as planetsControllers from "./controllers/planets.js"
import { create } from "domain";

const app = express();
dotenv.config()
const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());



app.get("/api/planets", planetsControllers.getAll);

app.get("/api/planets/:id", planetsControllers.getOneById);



app.post("/api/planets", create);

app.put("/api/planets/:id", planetsControllers.updateById);

app.delete("/api/planets/:id", planetsControllers.deleteById);

app.listen(port, () =>
    console.log(`Server listening on port: http://localhost:${port}`)
);
