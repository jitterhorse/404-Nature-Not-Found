import { ChatMessage, Page404 } from "~/data/types";
import chatData from '~/assets/data/chat.json'
import pages404Data from '~/assets/data/pages404.json'
import { Mesh, Vector3 } from "three";
import { chatHandleSceneChange } from "~/utils/chatLogic";
import {getPages404Bag} from "~/utils/pages404Logic";

type SceneName = keyof typeof chatData;

const availableScenes = Object.keys(chatData) as Array<SceneName>;

export const goScene = (direction: 1 | -1) => {
    const currentSceneIndex = availableScenes.indexOf(appState.scene)
    const nextSceneIndex = (currentSceneIndex + availableScenes.length + direction) % availableScenes.length
    appState.scene = availableScenes[nextSceneIndex]
        
    window.dispatchEvent(new CustomEvent('change-scene', {detail: {targetScene: appState.scene, targetNumber: nextSceneIndex}}))
    chatHandleSceneChange(availableScenes[currentSceneIndex]);
}

export const addScene = (content : Array<any>) => {
    const es = {} as EMSCHER_SCENE;
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
        }
    }
    )

    appState.scenes.push(es);

}

type LuckyNumbersPerScene = {[sceneName in SceneName]: Array<number>}
const _luckyNumbers: any = {}
Object.entries(chatData).forEach(([sceneName, entries]) => {
    _luckyNumbers[sceneName] = entries
        .map(({ isLuckyContent }, entryIndex) => ({ isLuckyContent, entryIndex}))
        .filter(({ isLuckyContent }) => isLuckyContent)
        .map(({ entryIndex }) => entryIndex)
})
const luckyNumbers = _luckyNumbers as LuckyNumbersPerScene;

type ChatPointerPerScene = { [sceneName in SceneName]: number | undefined }
const _chatPointers: any = {}
Object.keys(chatData).forEach((sceneName) => {
    _chatPointers[sceneName] = 0
})
const chatPointers = _chatPointers as ChatPointerPerScene;

interface EMSCHER_SCENE { 
    cam_pos: Vector3,
    cam_pov: Vector3,
    cam_fov: number,
    objs: Array<any> 
}

interface AppState {
    isChatOpen: boolean,
    isSimulateTyping: boolean,
    isShowIntro: boolean,
    autoChat: undefined | ReturnType<typeof setTimeout>,
    auto404: undefined | ReturnType<typeof setTimeout>,
    unreadMessages: number,
    messages: Array<ChatMessage>,
    scene: SceneName,
    chatPointers: ChatPointerPerScene,
    luckyNumbers: LuckyNumbersPerScene,
    tween_time: number,
    rocks: Array<Mesh>,
    scenes: Array<EMSCHER_SCENE>,
    currentPage404: Page404 | 'FORM' | undefined,
    pages404IndicesBag: Array<number>,
}

export const appState: AppState = reactive<AppState>({
    isChatOpen: false,
    isSimulateTyping: false,
    isShowIntro: true,
    autoChat: undefined,
    auto404: undefined,
    unreadMessages: 0,
    messages: [],
    scene: 'Intro',
    chatPointers,
    luckyNumbers,
    tween_time: 1000,
    rocks: [],
    scenes: [],
    currentPage404: undefined,
    pages404IndicesBag: getPages404Bag(),
})

