const path = require("path");
const fs = require("fs");

const input = path.join(__dirname, "./VietNameseDic.txt");
const data = fs.readFileSync(input, { encoding: "utf-8" });
let splitter = data.split("\r\n");
splitter = splitter.map(item => item.toLowerCase());
let jsonObject = {};
jsonObject["data"] = splitter;
const output = path.join(__dirname, "./VietNameseDicJson.json");
fs.writeFileSync(output, JSON.stringify(jsonObject), { encoding: "utf-8" });
console.log("Done!");