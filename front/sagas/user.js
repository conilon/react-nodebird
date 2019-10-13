import { all, fork, takeLatest, takeEvery, call, put, take, delay } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI() {
    // 서버에 요청을 보내는 부분
}

function* login() {
    try {
        yield fork(logger); // logger는 내 기록을 로깅하는 함수, 10초 걸린다.
        yield call(loginAPI);
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
    yield takeEvery(LOG_IN, login);
}

function* hello() {
    yield delay(2000);
    yield put({
        type: 'BYE_SAGA',
    });
}

function* watchHello() {
    yield takeEvery(HELLO_SAGA, hello);
}

/* 
function* watchHello() {
    while (true) {
        yield take(HELLO_SAGA);
        console.log(1);
        console.log(2);
        console.log(3);
        console.log(4);
        console.log(5);
    }
} */

export default function* userSaga() {
    yield all([
        fork(watchLogin()),
        fork(watchHello()),
    ]);
}
