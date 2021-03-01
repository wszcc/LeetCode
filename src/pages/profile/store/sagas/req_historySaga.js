import { call, put, takeLatest } from 'redux-saga/effects'
// import { reqPersonal } from '../../API/index'
import { GETLISTOFTOPICS } from '../redux_test'


function* reqHistoryData(action) {

    yield put({ type: GETLISTOFTOPICS })
}


function* watchReqHistoryData() {
    yield takeLatest("getList", reqHistoryData);
}

export default watchReqHistoryData