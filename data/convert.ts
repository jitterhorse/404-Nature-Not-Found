import xlsx from 'node-xlsx';
import fs from 'fs';
import {parseRow} from "./util";
const workSheetsFromFile = xlsx.parse(`${__dirname}/material/texts.xlsx`);
const chatData = {};
workSheetsFromFile.forEach(({ name, data }) => {
    chatData[name] = data.filter((row, rowIndex) => rowIndex > 0 && Boolean(row)).map(parseRow)
})
fs.writeFileSync(`${__dirname}/../assets/data/chat.json`, JSON.stringify(chatData))