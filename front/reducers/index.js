import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import portfolio from './portfolio';

const rootReducer = combineReducers({
    user,
    post,
    portfolio,
});

export default rootReducer;
