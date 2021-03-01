export enum actionTypes {
    like = 'like',
    unLike = 'unLike',
    collect = 'collect',
    unCollect = 'uncollect',
    exeCodeRes = 'exeCodeRes',
    summitCode = 'submitCode'
}

export interface ExeCodeRes {
    "result": string,
    "runtime": string,
    "runtimeBeat": string,
    "memory": string,
    "memoryBeat": string
}

interface Like { type: string, payload?:string }
interface unLike { type: string, payload?:string }
interface collect { type: string, payload?:string }
interface unCollect { type: string, payload?:string }
interface submitCode {type: string, payload:string}
interface exeCodeRes {type: string, payload:ExeCodeRes}

export const likeAction = (): Like => ({
    type: actionTypes.like
})

export const unLikeAction = () => ({
    type:actionTypes.unLike
})

export const collectAction = (): Like => ({
    type: actionTypes.collect
})

export const unCollectAction = () => ({
    type:actionTypes.unCollect
})

export const submitCodeaAction = (key:string) => ({
    type:actionTypes.summitCode,
    payload:key
})

export const exeCodeResAction = (codeRes:ExeCodeRes) =>({
    type:actionTypes.exeCodeRes,
    payload:codeRes
})

export type Actions = Like | unLike | collect | unCollect | submitCode | exeCodeRes