const path = require("path");
const fs = require("fs");

const input = path.join(__dirname, "./VietNameseDic.txt");
const data = fs.readFileSync(input, { encoding: "utf-8" });
const splitter = data.split("\r\n");
//const jsonObject = JSON.parse(splitter);
let jsonObject = {};
jsonObject["data"] = splitter;
const output = path.join(__dirname, "./VietNameseDicJson.json");
fs.writeFileSync(output, JSON.stringify(jsonObject), { encoding: "utf-8" });
console.log("Done!");