import { all, call } from 'redux-saga/effects'
import watchReqHistoryData from './req_historySaga'
import watchreqQuestionInfo from './req_questionInfo'


function* rootSaga() {
    yield all([call(watchReqHistoryData), call(watchreqQuestionInfo)])
}

export default rootSaga