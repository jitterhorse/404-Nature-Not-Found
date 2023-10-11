export enum TransitionType {
    LINEAR = 'LINEAR',
    RANDOM = 'RANDOM'
}

export interface ChatEntry {
    message?: string
    comment?: string
    mediaFile?: string
    mediaType?: 'image' | 'video'
    transitionType: TransitionType
    isLuckyContent: boolean
}