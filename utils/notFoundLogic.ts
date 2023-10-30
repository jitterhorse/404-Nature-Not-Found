import {appState} from "~/utils/appState";

const NOTFOUND_FREQUENCY = [300, 1000]
const EMPTY = "EMPTY";

const _newNotFoundNotification = async (): Promise<string | undefined> => {
    if (appState.notFoundBag.length === 0) {
        console.warn('All 404 pages have been shown. Add all again to bag');
    }
}

const _runAutoNotFound = (timeout?: number) => {
    const sendMessage = async () => {
        const messagingResult = await _newNotFoundNotification()
        if (messagingResult !== EMPTY) {
            _runAutoNotFound()
        }
    }

    appState.autoChat = setTimeout(sendMessage, timeout ?? Math.random() * (NOTFOUND_FREQUENCY[1] - NOTFOUND_FREQUENCY[0]) + NOTFOUND_FREQUENCY[0])
}



export const startAuto404 = () => {

    if (appState.auto404) {
        console.log("Start auto 404 aborted", appState.auto404)
        return;
    }
    _runAutoNotFound()

    /*
    if(new Date().getTime() - appState.last404EventTime >= 2000){
        if(Math.random() > 0.0){
            appState.event404 = true;
            appState.last404EventTime = new Date().getTime();
        } 
    } 
    */   
}