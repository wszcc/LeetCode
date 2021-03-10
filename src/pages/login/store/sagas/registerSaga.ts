import { call, put, takeEvery } from "_redux-saga@1.1.3@redux-saga/effects";
import request from "../../../../apis";
import { IResponse } from "../../components/LoginMain/types";
import {
    ActionTypes,
    cancelRegisterLoading,
    existedEmail,
    invalidCaptcha,
    IRegisterAction,
    registerLoading,
    registerSuccess
} from "../actions/emailRegisterForm";


export function* registerSaga() {
    yield takeEvery(ActionTypes.Register, function* (action: IRegisterAction) {

        const { payload } = action;
        yield put(registerLoading());
        try {
            const res: IResponse = yield call(request.post, '/user/register', payload);
            yield put(cancelRegisterLoading());
            console.log(res);

            if (res.code === 400) {
                if (res.data === '验证码错误') {
                    yield put(invalidCaptcha());
                } else {
                    yield put(existedEmail());
                }
            } else {
                yield put(registerSuccess());
            }
        } catch (err) {
            yield put(cancelRegisterLoading());
            console.log(err);
        }

    })
}

