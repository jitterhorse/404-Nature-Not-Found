import {ChatEntry, ChatMessageDirection, Page404, TransitionType} from "./types";
import {arrayFromOptionalColumns, isExtensionType, randomId, renderCustomMarkdown, transferMediaFile} from "./util";

export type Row = Array<string | number>

const MESSAGE_COLUMN = 0;
const COMMENT_COLUMN = 1;
const MEDIA_FILE_COLUMN = 2;
const TRANSITION_TYPE_COLUMN = 3;
const LUCKY_CONTENT_COLUMN = 4;
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png']
const VIDEO_EXTENSIONS = ['mp4']
export const parseChatRow = (row: Row): ChatEntry => {
    const chatEntry: ChatEntry = {
        message: {
            id: randomId(),
            text: row[MESSAGE_COLUMN] ? renderCustomMarkdown(row[MESSAGE_COLUMN] as string) : undefined,
            comment: row[COMMENT_COLUMN] as string,
            direction: ChatMessageDirection.INCOMING
        },
        transitionType: row[TRANSITION_TYPE_COLUMN] === 0 ? TransitionType.LINEAR : TransitionType.RANDOM,
        isLuckyContent: row[LUCKY_CONTENT_COLUMN] === 1,
    }

    if (row[MEDIA_FILE_COLUMN]) {
        chatEntry.message.mediaFile = transferMediaFile(row[MEDIA_FILE_COLUMN] as string);
        if (isExtensionType(chatEntry.message.mediaFile, IMAGE_EXTENSIONS)) {
            chatEntry.message.mediaType = 'image';
        } else if (isExtensionType(chatEntry.message.mediaFile, VIDEO_EXTENSIONS)) {
            chatEntry.message.mediaType = 'video';
        } else {
            console.error(`Unknown media file type: ${chatEntry.message.mediaFile}`)
            process.exit(1)
        }
    }

    return chatEntry
}

const NAME_COLUMN = 0;
const NAME_AI_COLUMN = 1;
const TEXT_COLUMN = 2;
const TEXT_AI_COLUMN = 3;
const PHOTO_ORIGINAL_COLUMN = 4;
const PAINTING_ORIGINAL_COLUMN = 5;
const PHOTO_AI_1_COLUMN = 6;
const PHOTO_AI_2_COLUMN = 7;
const PHOTO_AI_3_COLUMN = 8;
const PAINTING_AI_1_COLUMN = 9;
const PAINTING_AI_2_COLUMN = 10;
const PAINTING_AI_3_COLUMN = 11;

export const parsePage404Row = (row: Row, index: number): Page404 => {
    const entry: any = {
        id: `${row[NAME_COLUMN]}_${index}`,
        name: row[NAME_COLUMN],
        nameAi: row[NAME_AI_COLUMN],
        text: row[TEXT_COLUMN],
        textAi: row[TEXT_AI_COLUMN],
    }

    const photo = row[PHOTO_ORIGINAL_COLUMN] as string;
    if (photo) {
        entry.photo = transferMediaFile(photo)
    }
    const painting = row[PAINTING_ORIGINAL_COLUMN] as string;
    if (painting) {
        entry.painting = transferMediaFile(painting)
    }
    entry.photosAi = arrayFromOptionalColumns(row, [PHOTO_AI_1_COLUMN, PHOTO_AI_2_COLUMN, PHOTO_AI_3_COLUMN]).map(transferMediaFile)
    entry.paintingsAi = arrayFromOptionalColumns(row, [PAINTING_AI_1_COLUMN, PAINTING_AI_2_COLUMN, PAINTING_AI_3_COLUMN]).map(transferMediaFile)

    return entry;
}