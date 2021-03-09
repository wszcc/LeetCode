import { call, put, takeEvery } from "redux-saga/effects";
import request from "../../../../apis";
import { IResponse } from "../../components/LoginMain/types";
import { ActionTypes, cancelLoginLoading, errorLogin, ILoginAction, loginLoading, successLogin } from "../actions/pwdLoginForm";

export function* loginSaga() {
    yield takeEvery(ActionTypes.Login, function* (action: ILoginAction) {
        yield put(loginLoading());
        const { payload } = action;
        console.log(action);
        try {
            const res: IResponse = yield call(request.post, '/user/login', payload);
            yield put(cancelLoginLoading());
            console.log(res);

            
            if (res.code === 400) {
                // 账号或密码错误
                yield put(errorLogin());

            } else if (res.code === 200) {
                // 登录成功

                // 发送登录成功的 action
                yield put(successLogin());
            }


        } catch (err) {
            yield put(cancelLoginLoading());
            console.log(err);

            // 发送登录失败的 action
            // yield put(errorLogin())
        }
    })
}
