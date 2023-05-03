import { createServer } from "node:http";
import fs from "node:fs"

const server = createServer((request, response) => {
    console.log("request received");

    response.statusCode = 200;

    response.setHeader("Content-Type", "text/html");

    response.end(
        fs.readFileSync("./index.html")
    );
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
