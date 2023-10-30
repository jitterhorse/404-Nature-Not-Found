import path from 'path';
import fs from "fs";
import crypto from 'crypto';
import {marked} from "marked";
import {RendererObject} from "MarkedOptions";
import {Row} from "./parser";

export const isExtensionType = (filename: string, extensionList: Array<string>): boolean =>
    extensionList.includes(path.extname(filename).replace('.', '').toLowerCase())

const fileHash = (filename: string): string => {
    const fileBuffer = fs.readFileSync(filename);
    const hashSum = crypto.createHash('sha1');
    hashSum.update(fileBuffer);

    return hashSum.digest('hex');
}

export const transferMediaFile = (originalFileName: string): string => {
    const sanitizedFileName = `${__dirname}/material/${originalFileName.replace(/\\/g, '/')}`.replace(/\/\//g, '/')
    const internalFileName = fileHash(sanitizedFileName) + path.extname(sanitizedFileName)
    fs.copyFileSync(sanitizedFileName, `${__dirname}/../public/media/${internalFileName}`)
    return '/media/' + internalFileName
}

export const randomId = (): string => (Math.random() + 1).toString(36).substring(2, 5)

const renderer: RendererObject = {
    codespan(text) {
        return `<mark class="chat-mark-yellow">${text}</mark>`;
    },
    del(text) {
        return `<mark class="chat-mark-pink">${text}</mark>`;
    }
};

marked.use({ renderer });

export const renderCustomMarkdown = (markdown: string): string => {
    return marked(markdown)
}



export const arrayFromOptionalColumns = (row: Row, columnIndices: Array<number>): Row => {
    return columnIndices.map((index) => row[index]).filter(entry => Boolean(entry))
}

