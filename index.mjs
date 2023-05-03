import { createServer } from "node:http";
import fs from "node:fs"

const mars = fs.readFileSync("./mars.json").toString();


const server = createServer((request, response) => {
    console.log("request received");

    response.statusCode = 200;

    response.setHeader("Content-Type", "application/json");

    const jsonResponseBody = JSON.stringify(mars);

    response.end(jsonResponseBody);
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
