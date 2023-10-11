import path from 'path';
import fs from "fs";
import crypto from 'crypto';
import {ChatEntry, TransitionType} from "./types";

const MESSAGE_COLUMN = 0;
const COMMENT_COLUMN = 1;
const MEDIA_FILE_COLUMN = 2;
const TRANSITION_TYPE_COLUMN = 3;
const LUCKY_CONTENT_COLUMN = 4;

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png']
const VIDEO_EXTENSIONS = ['mp4']

const isExtensionType = (filename: string, extensionList: Array<string>): boolean =>
    extensionList.includes(path.extname(filename).replace('.', '').toLowerCase())

const fileHash = (filename: string): string => {
    const fileBuffer = fs.readFileSync(filename);
    const hashSum = crypto.createHash('sha1');
    hashSum.update(fileBuffer);

    return hashSum.digest('hex');
}

const transferMediaFile = (originalFileName: string): string => {
    const sanitizedFileName = `${__dirname}/material/${originalFileName.replace(/\\/g, '/')}`.replace(/\/\//g, '/')
    const internalFileName = fileHash(sanitizedFileName) + path.extname(sanitizedFileName)
    fs.copyFileSync(sanitizedFileName, `${__dirname}/../public/media/${internalFileName}`)
    return internalFileName
}

export const parseRow = (row): ChatEntry => {
    let chatEntry: ChatEntry = {
        message: row[MESSAGE_COLUMN],
        comment: row[COMMENT_COLUMN],
        transitionType: row[TRANSITION_TYPE_COLUMN] === 0 ? TransitionType.LINEAR : TransitionType.RANDOM,
        isLuckyContent: row[LUCKY_CONTENT_COLUMN] === 1
    }

    if (row[MEDIA_FILE_COLUMN]) {
        chatEntry.mediaFile = transferMediaFile(row[MEDIA_FILE_COLUMN]);
        if (isExtensionType(chatEntry.mediaFile, IMAGE_EXTENSIONS)) {
            chatEntry.mediaType = 'image';
        } else if (isExtensionType(chatEntry.mediaFile, VIDEO_EXTENSIONS)) {
            chatEntry.mediaType = 'video';
        } else {
            console.error(`Unknown media file type: ${chatEntry.mediaFile}`)
            process.exit(1)
        }
    }

    return chatEntry
}