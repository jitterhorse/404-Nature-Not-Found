export enum TransitionType {
    LINEAR = 'LINEAR',
    RANDOM = 'RANDOM'
}

export enum ChatMessageDirection {
    INCOMING = 'INCOMING',
    OUTGOING = 'OUTGOING',
    SYSTEM = 'SYSTEM'
}

export interface ChatMessage {
    id: string
    text?: string
    comment?: string
    mediaFile?: string
    mediaType?: 'image' | 'video'
    direction: ChatMessageDirection
}

export interface ChatEntry {
    message: ChatMessage
    transitionType: TransitionType
    isLuckyContent: boolean
}

export interface Page404 {
    id: string
    name?: string
    nameAi?:string
    text?: string
    textAi?: string
    photo?: string
    photosAi: Array<string>
    painting?: string
    paintingsAi: Array<string>
}

