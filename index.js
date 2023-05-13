const fs = require("fs");

const data = new Uint8Array(Buffer.from("Prova fs"))

fs.writeFile("./TestFs.txt", data, (error) => {
    if(error) console.log(error);
})