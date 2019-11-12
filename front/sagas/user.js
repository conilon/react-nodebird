import { all, fork, takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, 
    FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE, 
    UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UNFOLLOW_USER_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, 
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE, 
    EDIT_NICKNAME_REQUEST, EDIT_NICKNAME_SUCCESS, EDIT_NICKNAME_FAILURE, 
} from '../reducers/user';

function logInAPI(logInData) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/login', logInData, {
        withCredentials: true,
    });
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({ // put은 dispatch와 동일하다.
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
    return axios.post('/user', signUpData);
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

function logOutAPI() {
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            erorr: e,
        });
    }
}

function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI(userId) {
    return axios.get(userId ? `/user/${userId}` : '/user', {
        withCredentials: true, // 클라이언트에서 요청 보낼 때는 브라우저가 쿠키를 같이 동봉해준다.
    }); // 서버사이드렌더링일 때는, 브라우저가 없다.
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            erorr: e,
        });
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function followAPI(userId) {
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            erorr: e,
        });
    }
}

function* watchFollow() {
    yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unFollowAPI(userId) {
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
    });
}

function* unFollow(action) {
    try {
        const result = yield call(unFollowAPI, action.data);
        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            erorr: e,
        });
    }
}

function* watchUnfollow() {
    yield takeEvery(UNFOLLOW_USER_REQUEST, unFollow);
}

function loadFollowersAPI(userId, offset = 0, limit = 3) {
    return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data, action.offset);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            erorr: e,
        });
    }
}

function* watchLoadFollwers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
    return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data, action.offset);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            erorr: e,
        });
    }
}

function* watchLoadFollwings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(userId) {
    return axios.delete(`/user/${userId}/follower`, {
        withCredentials: true,
    });
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            erorr: e,
        });
    }
}

function* watchRemoveFollower() {
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
    return axios.patch('/user/nickname', { nickname }, {
        withCredentials: true,
    });
}

function* editNickname(action) {
    try {
        const result = yield call(editNicknameAPI, action.data);
        yield put({
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            erorr: e,
        });
    }
}

function* watchEditNickname() {
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollwers),
        fork(watchLoadFollwings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
}
