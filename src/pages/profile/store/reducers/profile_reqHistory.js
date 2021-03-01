import { GETLISTOFTOPICS, GETQUESTION } from '../redux_test'

const initProfile = null

export default function reducer(preState = initProfile, action) {
    const { type, data } = action
    switch (type) {
        case GETLISTOFTOPICS:
            return data
        case GETQUESTION:
            return data
        default:
            break;
    }
}