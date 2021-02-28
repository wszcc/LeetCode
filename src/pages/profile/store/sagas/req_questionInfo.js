import { call, put, takeEvery, } from 'redux-saga/effects'
// import { reqQuestion } from '../../API/index'
import { GETQUESTION } from '../redux_test'


function* reqQuestionInfo(action) {

    yield put({ type: GETQUESTION })
}


function* watchreqQuestionInfo() {
    yield takeEvery("getQues", reqQuestionInfo);
}

export default watchreqQuestionInfo