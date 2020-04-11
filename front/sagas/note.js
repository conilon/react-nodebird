import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { 
    NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_LIST_FAILURE,
    NOTE_ADD_REQUEST, NOTE_ADD_SUCCESS, NOTE_ADD_FAILURE,
    NOTE_VIEW_REQUEST, NOTE_VIEW_SUCCESS, NOTE_VIEW_FAILURE,
    NOTE_ALL_LIST_REQUEST, NOTE_ALL_LIST_SUCCESS, NOTE_ALL_LIST_FAILURE,
} from '../reducers/note';

function noteAddAPI(data) {
    return axios.post('/note', data, { 
        withCredentials: true,
    });
}

function* noteAdd(action) {
    try {
        const result = yield call(noteAddAPI, action.data);
        yield put({
            type: NOTE_ADD_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_ADD_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function noteListAPI(category, page) {
    return axios.get(`/note/category/${category}/${page}`);
}

function* noteList(action) {
    try {
        const result = yield call(noteListAPI, action.category, action.page);
        yield put({
            type: NOTE_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_LIST_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function noteViewAPI(category, id) {
    return axios.get(`/note/category/${category}/view/${id}`);
}

function* noteView(action) {
    try {
        const result = yield call(noteViewAPI, action.category, action.id);
        yield put({
            type: NOTE_VIEW_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_VIEW_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function noteAllListAPI() {
    return axios.get('/note/all');
}

function* noteAllList() {
    try {
        const result = yield call(noteAllListAPI);
        yield put({
            type: NOTE_ALL_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_ALL_LIST_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* noteAddWatch() { yield takeLatest(NOTE_ADD_REQUEST, noteAdd); }
function* noteListWatch() { yield takeLatest(NOTE_LIST_REQUEST, noteList); }
function* noteViewWatch() { yield takeLatest(NOTE_VIEW_REQUEST, noteView); }
function* noteAllListWatch() { yield takeLatest(NOTE_ALL_LIST_REQUEST, noteAllList); }

export default function* postSaga() {
    yield all([
        fork(noteAddWatch),
        fork(noteListWatch),
        fork(noteViewWatch),
        fork(noteAllListWatch),
    ]);
}
