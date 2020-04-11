import { combineReducers } from 'redux';
import user from './user';

// note
import note from './note';
import category from './category';

const rootReducer = combineReducers({
    user,
    note,
    category,
});

export default rootReducer;
