import { Actions } from './actions'
import  { actionTypes } from './actions'
export const initState = {
    name: 'zc',
    like:false,
    collect:false
}

interface State {
    name: string,
    like: boolean,
    collect: boolean
}

export const reducer = function (state:State = initState, action:Actions) {
    switch (action.type) {
        case `${actionTypes.like}`:
            state.like = true
            break;
        case `${actionTypes.unLike}`:
            state.like = false
            break;
        case `${actionTypes.collect}`:
            state.collect = true
            break;
        case `${actionTypes.unCollect}`:
            state.collect = false
            break;
        default:
            state.name = action as never
            break;
    }
}