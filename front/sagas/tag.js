import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { 
  TAG_LIST_REQUEST, TAG_LIST_SUCCESS, TAG_LIST_FAILURE,
} from '../reducers/tag';

function tagListAPI() {
  return axios.get('/tag');
}

function* tagList() {
  try {
    const result = yield call(tagListAPI);
    yield put({
      type: TAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: TAG_LIST_FAILURE,
      error: e.response && e.response.data,
    });
  }
}

function* tagListWatch() {
  yield takeLatest(TAG_LIST_REQUEST, tagList);
}

export default function* watcher() {
  yield all([
    fork(tagListWatch),
  ]);
}
