const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];

const app = express()
app.use(morgan())
app.use(express.json());
app.use((req, res, next) => {
    console.log(req)
    next();
})

app.get("/", (req, res) => {
    res.status(200).json(planets)
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})




