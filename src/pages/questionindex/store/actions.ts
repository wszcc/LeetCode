export enum actionTypes {
    like = 'like',
    unLike = 'unLike',
    collect = 'collect',
    unCollect = 'uncollect'
}

interface Like { type: string }
interface unLike {type: string}
interface collect {type:string}
interface unCollect {type: string}

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

export type Actions = Like | unLike | collect | unCollect