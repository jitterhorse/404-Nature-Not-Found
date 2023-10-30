import {appState} from "~/utils/appState";
import pages404Data from "assets/data/pages404.json";
import {shuffle} from "~/utils/misc";
import {stopAutoChat, startAutoChat} from "~/utils/chatLogic";

const FREQUENCY_404 = [10000, 20000]

export const getPages404Bag = () => shuffle(pages404Data.map((_, index) => index))

const _showForm404 = (timeout?: number) => {
    appState.auto404 = setTimeout(() => {
        appState.auto404 = undefined
        appState.currentPage404 = 'FORM'
        stopAutoChat()
    }, timeout ?? Math.random() * (FREQUENCY_404[1] - FREQUENCY_404[0]) + FREQUENCY_404[0])
}



export const startAuto404 = () => {
    if (appState.auto404) {
        console.log("Start auto 404 aborted", appState.auto404)
        return;
    }
    _showForm404()
}

export const stopAuto404 = () => {
    clearTimeout(appState.auto404);
    appState.auto404 = undefined;
}

export const showPage404 = () => {
    if (appState.pages404IndicesBag.length === 0) {
        console.warn('All 404 pages have been shown. Add all again to bag');
        appState.pages404IndicesBag = getPages404Bag()
    }

    appState.currentPage404 = pages404Data[appState.pages404IndicesBag.pop()!]
}

export const closePage404 = () => {
    appState.currentPage404 = undefined;
    startAuto404();
    startAutoChat();
}