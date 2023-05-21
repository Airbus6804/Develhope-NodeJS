import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";
import dotenv from "dotenv";

const app = express();
dotenv.config()
const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());

let planets = [
    {
        id: 1,
        name: "Earth",
    },
    { id: 2, name: "Mars" },
    {
        id: 3,
        name: "Jupiter",
    },
    {
        id: 4,
        name: "Venus",
    },
];

app.get("/api/planets", (req, res) => {
    res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));

    res.status(200).json(planet);
});

const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});

app.post("/api/planets", (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };

    const validation = planetSchema.validate(newPlanet);

    if (validation.error) {
        return res.status(400).json({ msg: validation.error.details[0].message });
    } else {
        planets.push(newPlanet);

        res.status(201).json({ msg: "Created new planet" });
    }
});

app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;

    const validation = Joi.object({name: Joi.string().required()}).validate(req.body)
    
    if(validation.error) return res.status(400).json({ msg: validation.error.details[0].message });
    
    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

    res.status(200).json({ msg: "Planet was updated" });
});

app.delete("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    planets = planets.filter((p) => p.id !== Number(id));

    res.status(200).json({ msg: "Planet was deleted" });
});

app.listen(port, () =>
    console.log(`Server listening on port: http://localhost:${port}`)
);
