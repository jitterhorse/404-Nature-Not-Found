import xlsx from 'node-xlsx';
import fs from 'fs';

import {parseChatRow, parsePage404Row} from "./parser";

const workSheetsFromFile = xlsx.parse(`${__dirname}/material/texts.xlsx`);
const chatData = {};
workSheetsFromFile.forEach(({ name, data }) => {
    chatData[name] = data.filter((row, rowIndex) => rowIndex > 0 && Boolean(row)).map(parseChatRow)
})
fs.writeFileSync(`${__dirname}/../assets/data/chat.json`, JSON.stringify(chatData))

const pages404FromFile = xlsx.parse(`${__dirname}/material/404seiten.xlsx`)
const pages404Data = pages404FromFile[0].data.filter((row, rowIndex) => rowIndex > 0 && Boolean(row) && row[0]).map(parsePage404Row)
fs.writeFileSync(`${__dirname}/../assets/data/pages404.json`, JSON.stringify(pages404Data))
