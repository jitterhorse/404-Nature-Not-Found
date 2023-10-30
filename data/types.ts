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

export interface notFoundPage {
    id: string
    name?: string
    nameai?:string
    text?: string
    textai?: string
    photo?: string
    paint?: string
    photoAI1?: string
    photoAI2?: string
    photoAI3?: string
    paintAI1?: string
    paintAI2?: string
    paintAI3?: string
}

