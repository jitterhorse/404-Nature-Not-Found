import {ChatEntry, ChatMessage, TransitionType} from "~/data/types";
import chatData from '~/assets/data/chat.json'
import { Mesh, Object3D, SkinnedMesh, Vector3 } from "three";

const availableScenes = Object.keys(chatData);

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

export const goScene = (direction: 1 | -1) => {
    const currentSceneIndex = availableScenes.indexOf(appState.scene)
    const nextSceneIndex = (currentSceneIndex + availableScenes.length + direction) % availableScenes.length
    appState.scene = availableScenes[nextSceneIndex]
        
    window.dispatchEvent(new CustomEvent('change-scene', {detail: {targetScene: appState.scene, targetNumber: nextSceneIndex}}))
}

export const addScene = (content : Array<any>) => {
    var es = {} as EMSCHER_SCENE; 
    es.cam_pos = new Vector3();
    es.cam_pov = new Vector3();
    es.cam_fov = 0;
    es.objs = [];

    content.forEach((elem) => {
        if(elem.name.includes("cam")){
            if(elem.name.includes("pos")){
                es.cam_pos = elem.position
            }
            else if(elem.name.includes("pov")){
                es.cam_pov = elem.position
                const splits = elem.name.split('_');
                es.cam_fov = splits[splits.length-1];
            }
        }
        else{
            es.objs.push(elem);
            //console.log(elem);
        }
    }
    )

    appState.scenes.push(es);

}

export const start404Event = () => {
    if(new Date().getTime() - appState.last404EventTime >= 2000){
        if(Math.random() > 0.0){
            appState.event404 = true;
            appState.last404EventTime = new Date().getTime();
        } 
    }    
}

const luckyNumbers = {}
Object.entries(chatData).forEach(([sceneName, entries]) => {
    luckyNumbers[sceneName] = entries
        .map(({ isLuckyContent }, entryIndex) => ({ isLuckyContent, entryIndex}))
        .filter(({ isLuckyContent }) => isLuckyContent)
        .map(({ entryIndex }) => entryIndex)
})

interface EMSCHER_SCENE { 
    cam_pos: THREE.Vector3,
    cam_pov: THREE.Vector3,
    cam_fov: number,
    objs: Array<any> 
};

interface AppState {
    isChatOpen: boolean,
    event404: boolean,
    last404EventTime: number,
    unreadMessages: number,
    messages: Array<ChatMessage>,
    scene: string,
    chatPointer?: { index: number },
    luckyNumbers: {[sceneName: string]: Array<number>},
    tween_time: number,
    rocks: Array<Mesh>,
    scenes: Array<EMSCHER_SCENE>
}

export const appState: AppState = reactive({
    isChatOpen: false,
    event404: false,
    last404EventTime: 0,
    unreadMessages: 0,
    messages: [],
    scene: 'Intro',
    chatPointer: {
        index: 0
    },
    luckyNumbers,
    tween_time: 1000,
    rocks: [],
    scenes: []
})

