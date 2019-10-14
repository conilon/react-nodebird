import { all, fork, takeLatest, takeEvery, call, put, take, delay } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
} from '../reducers/user';

function loginAPI(loginData) {
    // 서버에 요청을 보내는 부분
    return axios.post('/login', loginData);
}

function* login(action) {
    try {
        call(loginAPI, action.data);
        yield put({ // put은 dispatch와 동일하다.
            type: LOG_IN_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
    return axios.post('http://localhost:3065/api/user/', signUpData);
}

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            erorr: e,
        });
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
    ]);
}
