import {Request, Response} from "express";
import Joi from "joi";

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

export default planets;

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
};

const getOneById = (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));

    res.status(200).json(planet);
};

const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});

const create = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };

    const validation = planetSchema.validate(newPlanet);

    if (validation.error) {
        return res
            .status(400)
            .json({ msg: validation.error.details[0].message });
    } else {
        planets.push(newPlanet);

        res.status(201).json({ msg: "Created new planet" });
    }
};

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;

    const validation = Joi.object({ name: Joi.string().required() }).validate(
        req.body
    );

    if (validation.error)
        return res
            .status(400)
            .json({ msg: validation.error.details[0].message });

    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

    res.status(200).json({ msg: "Planet was updated" });
};

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    planets = planets.filter((p) => p.id !== Number(id));

    res.status(200).json({ msg: "Planet was deleted" });
};



export {getAll, getOneById, create, updateById, deleteById}
