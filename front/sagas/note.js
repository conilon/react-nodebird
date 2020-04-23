import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { 
    NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_LIST_FAILURE,
    NOTE_ADD_REQUEST, NOTE_ADD_SUCCESS, NOTE_ADD_FAILURE,
    NOTE_VIEW_REQUEST, NOTE_VIEW_SUCCESS, NOTE_VIEW_FAILURE,
    NOTE_ALL_LIST_REQUEST, NOTE_ALL_LIST_SUCCESS, NOTE_ALL_LIST_FAILURE,
    ADMIN_NOTE_LIST_REQUEST, ADMIN_NOTE_LIST_SUCCESS, ADMIN_NOTE_LIST_FAILURE,
    NOTE_ADMIN_VIEW_REQUEST, NOTE_ADMIN_VIEW_SUCCESS, NOTE_ADMIN_VIEW_FAILURE,
    NOTE_EDIT_REQUEST, NOTE_EDIT_SUCCESS, NOTE_EDIT_FAILURE,
    NOTE_TAG_REQUEST, NOTE_TAG_SUCCESS, NOTE_TAG_FAILURE,
} from '../reducers/note';

// note write
function noteAddAPI(data) {
    return axios.post('/note', data, { withCredentials: true });
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

function* noteAddWatch() {
    yield takeLatest(NOTE_ADD_REQUEST, noteAdd);
}

// note edit
function noteEditAPI(data) {
    return axios.post('/note/edit', data, { withCredentials: true });
}

function* noteEdit(action) {
    try {
        const result = yield call(noteEditAPI, action.data);
        yield put({
            type: NOTE_EDIT_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_EDIT_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* noteEditWatch() {
    yield takeLatest(NOTE_EDIT_REQUEST, noteEdit);
}

function noteListAPI(category, page) {
    return axios.get(`/note/category/${encodeURIComponent(category)}/${page}`);
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

function* noteListWatch() {
    yield takeLatest(NOTE_LIST_REQUEST, noteList);
}

function noteTagAPI(tag, page) {
    return axios.get(`/tag/${encodeURIComponent(tag)}/${page}`);
}

function* noteTag(action) {
    try {
        const result = yield call(noteTagAPI, action.tag, action.page);
        yield put({
            type: NOTE_TAG_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_TAG_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* noteTagWatch() {
    yield takeLatest(NOTE_TAG_REQUEST, noteTag);
}

function noteViewAPI(id) {
    return axios.get(`/note/view/${id}`);
}

function* noteView(action) {
    try {
        const result = yield call(noteViewAPI, action.id);
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

function adminNoteListAPI(page) {
    return axios.get(`/admin/note/${page}`);
}

function* adminNoteList(action) {
    try {
        const result = yield call(adminNoteListAPI, action.page);
        yield put({
            type: ADMIN_NOTE_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADMIN_NOTE_LIST_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function adminNoteViewAPI(id) {
    return axios.get(`/admin/note/view/${id}`);
}

function* adminViewList(action) {
    try {
        const result = yield call(adminNoteViewAPI, action.id);
        yield put({
            type: NOTE_ADMIN_VIEW_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: NOTE_ADMIN_VIEW_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* noteViewWatch() {
    yield takeLatest(NOTE_VIEW_REQUEST, noteView);
}
function* noteAllListWatch() {
    yield takeLatest(NOTE_ALL_LIST_REQUEST, noteAllList);
}
function* adminNoteListWatch() {
    yield takeLatest(ADMIN_NOTE_LIST_REQUEST, adminNoteList);
}
function* adminNoteViewWatch() {
    yield takeLatest(NOTE_ADMIN_VIEW_REQUEST, adminViewList);
}

export default function* watcher() {
    yield all([
        fork(noteAddWatch),
        fork(noteListWatch),
        fork(noteViewWatch),
        fork(noteAllListWatch),
        fork(adminNoteListWatch),
        fork(adminNoteViewWatch),
        fork(noteEditWatch),
        fork(noteTagWatch),
    ]);
}
