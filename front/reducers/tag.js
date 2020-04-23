import produce from 'immer';

const INITIAL_STATE = {
    data: [],
    count: 0,
    ing: false,
    ed: false,
    message: null,
};

export const TAG_LIST_REQUEST = 'TAG_LIST_REQUEST';
export const TAG_LIST_SUCCESS = 'TAG_LIST_SUCCESS';
export const TAG_LIST_FAILURE = 'TAG_LIST_FAILURE';

const reducer = (state = INITIAL_STATE, action) => (
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_LIST_REQUEST: {
        draft.data = [];
        draft.count = 0;
        draft.ing = true;
        draft.ed = false;
        draft.message = null;
        break;
      }
      case TAG_LIST_SUCCESS: {
        draft.data = action.data;
        draft.ing = false;
        draft.ed = true;
        draft.message = null;
        break;
      }
      case TAG_LIST_FAILURE: {
        draft.data = [];
        draft.count = 0;
        draft.ing = false;
        draft.ed = false;
        draft.message = action.error;
        break;
      }
      default: {
        break;
      }
    }
  })
);

export default reducer;
