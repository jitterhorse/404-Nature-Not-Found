import {ChatEntry, ChatMessage, TransitionType} from "~/data/types";
import chatData from '~/assets/data/chat.json'

export const newAutomaticMessage = () => {
    if (!appState.chatPointer) {
        console.warn('New automatic message requested, but chat pointer is empty – silently skipping.');
        return;
    }

    const entry: ChatEntry = chatData[appState.scene][appState.chatPointer.index]
    appState.messages.push(entry.message)

    if (entry.transitionType === TransitionType.LINEAR) {
        if (appState.chatPointer.index >= chatData[appState.scene].length - 1) {
            appState.chatPointer = undefined
        } else {
            appState.chatPointer.index += 1
        }
    } else if (entry.transitionType === TransitionType.RANDOM) {
        const luckyNumbers = appState.luckyNumbers[appState.scene]

        if (luckyNumbers.length === 0) {
            appState.chatPointer = undefined
        } else {
            const luckyIndex = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)]
            appState.luckyNumbers[appState.scene] = luckyNumbers.filter(luckyNumber => luckyNumber !== luckyIndex)
            appState.chatPointer.index = luckyIndex
        }
    } else {
        console.error('Unknown transition type: ' + entry.transitionType)
    }

    if (!appState.isChatOpen) {
        appState.unreadMessages += 1
    }
}

const luckyNumbers = {}
Object.entries(chatData).forEach(([sceneName, entries]) => {
    luckyNumbers[sceneName] = entries
        .map(({ isLuckyContent }, entryIndex) => ({ isLuckyContent, entryIndex}))
        .filter(({ isLuckyContent }) => isLuckyContent)
        .map(({ entryIndex }) => entryIndex)
})

interface AppState {
    isChatOpen: boolean,
    unreadMessages: number,
    messages: Array<ChatMessage>,
    scene: string,
    chatPointer?: { index: number },
    luckyNumbers: {[sceneName: string]: Array<number>}
}

export const appState: AppState = reactive({
    isChatOpen: false,
    unreadMessages: 0,
    messages: [],
    scene: 'Intro',
    chatPointer: {
        index: 0
    },
    luckyNumbers
})