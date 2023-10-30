import chatData from "assets/data/chat.json";
import {ChatEntry, TransitionType} from "~/data/types";
import {appState} from "~/utils/appState";

export const startAutoChat = () => {
    setInterval(() => newAutomaticMessage(), 3000)
}

export const newAutomaticMessage = () => {
    if (!appState.chatPointer) {
        console.warn('New automatic message requested, but chat pointer is empty – silently skipping.');
        return;
    }

    const entry = chatData[appState.scene][appState.chatPointer.index] as ChatEntry
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