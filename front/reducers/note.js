import produce from 'immer';

const INITIAL_STATE = {
    data: [],
    count: 0,
    ing: false,
    ed: false,
    message: null,
};

export const NOTE_ADD_REQUEST = 'NOTE_ADD_REQUEST';
export const NOTE_ADD_SUCCESS = 'NOTE_ADD_SUCCESS';
export const NOTE_ADD_FAILURE = 'NOTE_ADD_FAILURE';

export const NOTE_EDIT_REQUEST = 'NOTE_EDIT_REQUEST';
export const NOTE_EDIT_SUCCESS = 'NOTE_EDIT_SUCCESS';
export const NOTE_EDIT_FAILURE = 'NOTE_EDIT_FAILURE';

export const NOTE_LIST_REQUEST = 'NOTE_LIST_REQUEST';
export const NOTE_LIST_SUCCESS = 'NOTE_LIST_SUCCESS';
export const NOTE_LIST_FAILURE = 'NOTE_LIST_FAILURE';

export const NOTE_TAG_REQUEST = 'NOTE_TAG_REQUEST';
export const NOTE_TAG_SUCCESS = 'NOTE_TAG_SUCCESS';
export const NOTE_TAG_FAILURE = 'NOTE_TAG_FAILURE';

export const NOTE_VIEW_REQUEST = 'NOTE_VIEW_REQUEST';
export const NOTE_VIEW_SUCCESS = 'NOTE_VIEW_SUCCESS';
export const NOTE_VIEW_FAILURE = 'NOTE_VIEW_FAILURE';

export const NOTE_ALL_LIST_REQUEST = 'NOTE_ALL_LIST_REQUEST';
export const NOTE_ALL_LIST_SUCCESS = 'NOTE_ALL_LIST_SUCCESS';
export const NOTE_ALL_LIST_FAILURE = 'NOTE_ALL_LIST_FAILURE';

export const ADMIN_NOTE_LIST_REQUEST = 'ADMIN_NOTE_LIST_REQUEST';
export const ADMIN_NOTE_LIST_SUCCESS = 'ADMIN_NOTE_LIST_SUCCESS';
export const ADMIN_NOTE_LIST_FAILURE = 'ADMIN_NOTE_LIST_FAILURE';

export const NOTE_ADMIN_VIEW_REQUEST = 'NOTE_ADMIN_VIEW_REQUEST';
export const NOTE_ADMIN_VIEW_SUCCESS = 'NOTE_ADMIN_VIEW_SUCCESS';
export const NOTE_ADMIN_VIEW_FAILURE = 'NOTE_ADMIN_VIEW_FAILURE';

const reducer = (state = INITIAL_STATE, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case NOTE_ADMIN_VIEW_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_ADMIN_VIEW_SUCCESS: {
                draft.data = action.data;
                draft.ing = false;
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_ADMIN_VIEW_FAILURE: {
                draft.data = [];
                draft.count = 0;
                draft.ing = false;
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case ADMIN_NOTE_LIST_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case ADMIN_NOTE_LIST_SUCCESS: {
                draft.data = action.data.rows;
                draft.count = action.data.count;
                draft.ing = false;
                draft.ed = true;
                draft.message = null;
                break;
            }
            case ADMIN_NOTE_LIST_FAILURE: {
                draft.data = [];
                draft.ing = false;
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case NOTE_EDIT_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_EDIT_SUCCESS: {
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_EDIT_FAILURE: {
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case NOTE_ADD_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_ADD_SUCCESS: {
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_ADD_FAILURE: {
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case NOTE_LIST_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_LIST_SUCCESS: {
                draft.data = action.data.rows;
                draft.count = action.data.count;
                draft.ing = true;
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_LIST_FAILURE: {
                draft.data = [];
                draft.ing = false;
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case NOTE_TAG_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_TAG_SUCCESS: {
                draft.data = action.data.rows;
                draft.count = action.data.count;
                draft.ing = false;
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_TAG_FAILURE: {
                draft.data = [];
                draft.ing = false;
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case NOTE_VIEW_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_VIEW_SUCCESS: {
                draft.data = action.data;
                draft.ing = false;
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_VIEW_FAILURE: {
                draft.data = [];
                draft.ing = false;
                draft.ed = false;
                draft.message = action.error;
                break;
            }
            case NOTE_ALL_LIST_REQUEST: {
                draft.data = [];
                draft.count = 0;
                draft.ing = true;
                draft.ed = false;
                draft.message = null;
                break;
            }
            case NOTE_ALL_LIST_SUCCESS: {
                draft.data = action.data;
                draft.ing = false;
                draft.ed = true;
                draft.message = null;
                break;
            }
            case NOTE_ALL_LIST_FAILURE: {
                draft.data = [];
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
