import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE,
    ADMIN_CATEGORY_LIST_REQUEST, ADMIN_CATEGORY_LIST_SUCCESS, ADMIN_CATEGORY_LIST_FAILURE,
    ADMIN_CATEGORY_VIEW_REQUEST, ADMIN_CATEGORY_VIEW_SUCCESS, ADMIN_CATEGORY_VIEW_FAILURE,
    ADMIN_CATEGORY_CREATE_REQUEST, ADMIN_CATEGORY_CREATE_SUCCESS, ADMIN_CATEGORY_CREATE_FAILURE,
    ADMIN_CATEGORY_PAGE_LIST_REQUEST, ADMIN_CATEGORY_PAGE_LIST_SUCCESS, ADMIN_CATEGORY_PAGE_LIST_FAILURE,
} from '../reducers/category';


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

function* watchCategory() {
    yield takeLatest(CATEGORY_LIST_REQUEST, category);
}

function adminCategoryListAPI() {
    return axios.get('/admin/category');
}

function* adminCategoryList() {
    try {
        const result = yield call(adminCategoryListAPI);
        yield put({
            type: ADMIN_CATEGORY_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADMIN_CATEGORY_LIST_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchAdminCategoryList() {
    yield takeLatest(ADMIN_CATEGORY_LIST_REQUEST, adminCategoryList);
}

function adminCategoryPageListAPI(page) {
    return axios.get(`/admin/category/page/${page}`);
}

function* adminCategoryPageList(action) {
    try {
        const result = yield call(adminCategoryPageListAPI, action.page);
        yield put({
            type: ADMIN_CATEGORY_PAGE_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADMIN_CATEGORY_PAGE_LIST_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchAdminCategoryPageList() {
    yield takeLatest(ADMIN_CATEGORY_PAGE_LIST_REQUEST, adminCategoryPageList);
}

function adminCategoryViewAPI(id) {
    return axios.get(`/admin/category/edit/${id}`);
}

function* adminCategoryView(action) {
    try {
        const result = yield call(adminCategoryViewAPI, action.id);
        yield put({
            type: ADMIN_CATEGORY_VIEW_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADMIN_CATEGORY_VIEW_FAILURE,
            error: e.response && e.response.data,
        });
    }
}

function* watchAdminCategoryView() {
    yield takeLatest(ADMIN_CATEGORY_VIEW_REQUEST, adminCategoryView);
}

function adminCategoryCreateAPI(data) {
    return axios.post('admin/category', data, {
        withCredentials: true,
    });
}

function* adminCategoryCreate(action) {
    try {
        const result = yield call(adminCategoryCreateAPI, action.data);
        yield put({
            type: ADMIN_CATEGORY_CREATE_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADMIN_CATEGORY_CREATE_FAILURE,
            error: e,
        });
    }
}

function* watchAdminCategoryCreate() {
    yield takeLatest(ADMIN_CATEGORY_CREATE_REQUEST, adminCategoryCreate);
}

export default function* adminCategorySaga() {
    yield all([
        fork(watchCategory),
        fork(watchAdminCategoryPageList),
        fork(watchAdminCategoryList),
        fork(watchAdminCategoryView),
        fork(watchAdminCategoryCreate),
    ]);
}
