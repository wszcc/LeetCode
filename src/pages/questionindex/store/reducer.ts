import { Actions } from './actions'
import { actionTypes, ExeCodeRes } from './actions'
export const initState = {
    name: 'zc',
    like: false,
    collect: false,
    activeKey: '1',
    exeCodeRes: {
        "result": "",
        "runtime": "",
        "runtimeBeat": "",
        "memory": "",
        "memoryBeat": ""
    }
}

interface State {
    name: string,
    like: boolean,
    collect: boolean,
    activeKey: string,
    exeCodeRes: ExeCodeRes
}

export const reducer = function (state: State = initState, action: Actions) {
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
        case `${actionTypes.summitCode}`:
            state.activeKey = action.payload as string
            break;
        case `${actionTypes.exeCodeRes}`:
            state.exeCodeRes = action.payload as ExeCodeRes
            break;
        default:
            state.name = action as never
            break;
    }
}