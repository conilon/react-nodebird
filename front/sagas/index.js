import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user from './user';
import note from './note';
import category from './category';
import tag from './tag';

import { backUrl } from '../config/config';

axios.defaults.baseURL = `${backUrl}/api`;

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(note),
    fork(category),
    fork(tag),
  ]);
}
