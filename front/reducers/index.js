import { combineReducers } from 'redux';
import user from './user';
import note from './note';
import category from './category';
import tag from './tag';

const rootReducer = combineReducers({
  user,
  note,
  category,
  tag,
});

export default rootReducer;
