import chatData from "assets/data/chat.json";
import responsesData from "assets/data/responses.json";
import {ChatEntry, ChatMessageDirection, TransitionType} from "~/data/types";
import {appState} from "~/utils/appState";
import {randomEntry, sleep} from "~/utils/misc";

const CHAT_FREQUENCY = [3000, 10000]
const CHAT_STOP = "STOP";

const _newAutomaticMessage = async (): Promise<string | undefined> => {
    const chatPointer = appState.chatPointers[appState.scene]
    if (chatPointer === undefined) {
        console.warn('New automatic message requested, but chat pointer is empty – stopping.');
        return CHAT_STOP;
    }

    const entry = chatData[appState.scene][chatPointer] as ChatEntry

    appState.isSimulateTyping = true;
    await sleep(entry.message.text?.length ? entry.message.text.length * 10 : 1500)
    appState.isSimulateTyping = false;

    appState.messages.push(entry.message)

    if (entry.transitionType === TransitionType.LINEAR) {
        if (chatPointer >= chatData[appState.scene].length - 1) {
            appState.chatPointers[appState.scene] = undefined
        } else {
            appState.chatPointers[appState.scene] = chatPointer + 1
        }
    } else if (entry.transitionType === TransitionType.RANDOM) {
        const luckyNumbers = appState.luckyNumbers[appState.scene]

        if (luckyNumbers.length === 0) {
            appState.chatPointers[appState.scene] = undefined
        } else {
            const luckyIndex = randomEntry(luckyNumbers)
            appState.luckyNumbers[appState.scene] = luckyNumbers.filter(luckyNumber => luckyNumber !== luckyIndex)
            appState.chatPointers[appState.scene] = luckyIndex
        }
    } else {
        console.error('Unknown transition type: ' + entry.transitionType)
    }

    if (!appState.isChatOpen) {
        appState.unreadMessages += 1
    }
}

const _runAutoChat = (timeout?: number) => {
    const sendMessage = async () => {
        const messagingResult = await _newAutomaticMessage()
        if (messagingResult !== CHAT_STOP) {
            _runAutoChat()
        }
    }

    appState.autoChat = setTimeout(sendMessage, timeout ?? Math.random() * (CHAT_FREQUENCY[1] - CHAT_FREQUENCY[0]) + CHAT_FREQUENCY[0])
}

const _sendAutoResponse = (): void => {
    appState.messages.push({
        id: `auto-${appState.messages.length}`,
        text: randomEntry(responsesData.answers),
        direction: ChatMessageDirection.INCOMING
    })
}

export const stopAutoChat = () => {
    clearTimeout(appState.autoChat);
    appState.autoChat = undefined;
}

export const startAutoChat = () => {
    if (appState.autoChat) {
        console.log("Start auto chat aborted", appState.autoChat)
        return;
    }
    _runAutoChat()
}

export const insertUserMessage = (text: string): void => {
    stopAutoChat()

    appState.messages.push({
        id: `user-${appState.messages.length}`,
        text,
        direction: ChatMessageDirection.OUTGOING
    })

    setTimeout(_sendAutoResponse, 500);
    _runAutoChat(1500);
}

export const chatHandleSceneChange = (oldSceneName: string) => {
    stopAutoChat()

    appState.messages.push({
        id: `system-leave-${appState.messages.length}`,
        text: `You left the group <i>${oldSceneName}</i>`,
        direction: ChatMessageDirection.SYSTEM,
    })
    appState.messages.push({
        id: `system-enter-${appState.messages.length}`,
        text: `You joined the group <i>${appState.scene}</i>`,
        direction: ChatMessageDirection.SYSTEM,
    })

    startAutoChat();
}

export const openChat = () => {
    appState.isChatOpen = true;
    stopAuto404();
}

export const closeChat = () => {
    appState.isChatOpen = false;
    startAuto404();
}
