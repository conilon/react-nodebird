import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_MENU_NOTE_CATEGORIES_REQUEST, LOAD_MENU_NOTE_CATEGORIES_SUCCESS, LOAD_MENU_NOTE_CATEGORIES_FAILURE,
    LOAD_NOTE_CATEGORIES_REQUEST, LOAD_NOTE_CATEGORIES_SUCCESS, LOAD_NOTE_CATEGORIES_FAILURE,
    ADD_NOTE_CATEGORY_REQUEST, ADD_NOTE_CATEGORY_SUCCESS, ADD_NOTE_CATEGORY_FAILURE, 
    TOGGLE_NOTE_CATEGORY_VISIBLE_REQUEST, TOGGLE_NOTE_CATEGORY_VISIBLE_SUCCESS, TOGGLE_NOTE_CATEGORY_VISIBLE_FAILURE,
    SINGLE_LOAD_NOTE_CATEGORY_REQUEST, SINGLE_LOAD_NOTE_CATEGORY_SUCCESS, SINGLE_LOAD_NOTE_CATEGORY_FAILURE,
    MODIFY_NOTE_CATEGORY_REQUEST, MODIFY_NOTE_CATEGORY_SUCCESS, MODIFY_NOTE_CATEGORY_FAILURE,
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE,
} from '../reducers/category';

function loadNaviCategoryAPI() {
    return axios.get('/category/');
}

function* loadNaviCategory(action) {
    try {
        const result = yield call(loadNaviCategoryAPI, action.page);
        yield put({
            type: LOAD_MENU_NOTE_CATEGORIES_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_MENU_NOTE_CATEGORIES_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchNaviLoadCategory() {
    yield takeLatest(LOAD_MENU_NOTE_CATEGORIES_REQUEST, loadNaviCategory);
}

function loadCategoryAPI(page) {
    return axios.get(`/category/all/${page}`);
}

function* loadCategory(action) {
    try {
        const result = yield call(loadCategoryAPI, action.page);
        yield put({
            type: LOAD_NOTE_CATEGORIES_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_NOTE_CATEGORIES_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchLoadCategory() {
    yield takeLatest(LOAD_NOTE_CATEGORIES_REQUEST, loadCategory);
}

function addCategoryAPI(data) {
    return axios.post('/category', data, {
        withCredentials: true,
    });
}

function* addCategory(action) {
    try {
        const result = yield call(addCategoryAPI, action.data);
        yield put({
            type: ADD_NOTE_CATEGORY_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_NOTE_CATEGORY_FAILURE,
            error: e,
        });
    }
}

function* watchAddCategory() {
    yield takeLatest(ADD_NOTE_CATEGORY_REQUEST, addCategory);
}

function toggleCategoryVisibleAPI(categoryId, visible) {
    return axios.patch(`/category/toggle/visible/${categoryId}`, { visible }, {
        withCredentials: true,
    });
}

function* toggleCategoryVisible(action) {
    try {
        const result = yield call(toggleCategoryVisibleAPI, action.categoryId, action.visible);
        yield put({
            type: TOGGLE_NOTE_CATEGORY_VISIBLE_SUCCESS,
            data: result.data,
            categoryId: action.categoryId,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: TOGGLE_NOTE_CATEGORY_VISIBLE_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchToggleCategoryVisible() {
    yield takeLatest(TOGGLE_NOTE_CATEGORY_VISIBLE_REQUEST, toggleCategoryVisible);
}

function singleLoadCategoryAPI(categoryId) {
    return axios.get(`/category/single/${categoryId}`);
}

function* singleLoadCategory(action) {
    try {
        const result = yield call(singleLoadCategoryAPI, action.data);
        yield put({
            type: SINGLE_LOAD_NOTE_CATEGORY_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SINGLE_LOAD_NOTE_CATEGORY_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchSingleLoadCategory() {
    yield takeLatest(SINGLE_LOAD_NOTE_CATEGORY_REQUEST, singleLoadCategory);
}

function modifyCategoryAPI(categoryData) {
    return axios.put('/category/single', categoryData, {
        withCredentials: true,
    });
}

function* modifyCategory(action) {
    try {
        const result = yield call(modifyCategoryAPI, action.data);
        yield put({
            type: MODIFY_NOTE_CATEGORY_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: MODIFY_NOTE_CATEGORY_FAILURE,
            error: e,
        });
    }
}

function* watchModifyCategory() {
    yield takeLatest(MODIFY_NOTE_CATEGORY_REQUEST, modifyCategory);
}

function categoryAPI() {
    return axios.get('/category/');
}

function* category() {
    try {
        const result = yield call(categoryAPI);
        yield put({
            type: CATEGORY_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: CATEGORY_LIST_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* categoryWatch() {
    yield takeLatest(CATEGORY_LIST_REQUEST, category);
}

export default function* adminCategorySaga() {
    yield all([
        fork(watchNaviLoadCategory),
        fork(watchLoadCategory),
        fork(watchAddCategory),
        fork(watchToggleCategoryVisible),
        fork(watchSingleLoadCategory),
        fork(watchModifyCategory),
        fork(categoryWatch),
    ]);
}
