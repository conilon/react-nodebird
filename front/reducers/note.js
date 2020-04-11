import produce from 'immer';

const initialState = {
    // use to write page
    add: {
        added: false,
        message: null,
    },
    // use to list page
    list: {
        data: [],
        loading: false,
        loaded: false,
        message: null,
    },
    // use to view page
    view: {
        data: null,
        loading: false,
        loaded: false,
        message: null,
    },
};

export const NOTE_ADD_REQUEST = 'NOTE_ADD_REQUEST';
export const NOTE_ADD_SUCCESS = 'NOTE_ADD_SUCCESS';
export const NOTE_ADD_FAILURE = 'NOTE_ADD_FAILURE';

export const NOTE_LIST_REQUEST = 'NOTE_LIST_REQUEST';
export const NOTE_LIST_SUCCESS = 'NOTE_LIST_SUCCESS';
export const NOTE_LIST_FAILURE = 'NOTE_LIST_FAILURE';

export const NOTE_VIEW_REQUEST = 'NOTE_VIEW_REQUEST';
export const NOTE_VIEW_SUCCESS = 'NOTE_VIEW_SUCCESS';
export const NOTE_VIEW_FAILURE = 'NOTE_VIEW_FAILURE';

export const NOTE_ALL_LIST_REQUEST = 'NOTE_ALL_LIST_REQUEST';
export const NOTE_ALL_LIST_SUCCESS = 'NOTE_ALL_LIST_SUCCESS';
export const NOTE_ALL_LIST_FAILURE = 'NOTE_ALL_LIST_FAILURE';

const reducer = (state = initialState, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case NOTE_ADD_REQUEST: {
                draft.add.added = false;
                draft.add.message = null;
                break;
            }
            case NOTE_ADD_SUCCESS: {
                draft.add.added = true;
                draft.add.message = null;
                break;
            }
            case NOTE_ADD_FAILURE: {
                draft.add.added = false;
                draft.add.message = action.error;
                break;
            }
            case NOTE_LIST_REQUEST: {
                draft.list.data = [];
                draft.list.loading = true;
                draft.list.loaded = false;
                draft.list.message = null;
                break;
            }
            case NOTE_LIST_SUCCESS: {
                draft.list.data = action.data.rows;
                draft.list.count = action.data.count;
                draft.list.loading = false;
                draft.list.loaded = true;
                draft.list.message = null;
                break;
            }
            case NOTE_LIST_FAILURE: {
                draft.list.data = [];
                draft.list.loading = false;
                draft.list.loaded = false;
                draft.list.message = action.error;
                break;
            }
            case NOTE_VIEW_REQUEST: {
                draft.view.data = [];
                draft.view.loading = true;
                draft.view.loaded = false;
                draft.view.message = null;
                break;
            }
            case NOTE_VIEW_SUCCESS: {
                draft.view.data = action.data;
                draft.view.loading = false;
                draft.view.loaded = true;
                draft.view.message = null;
                break;
            }
            case NOTE_VIEW_FAILURE: {
                draft.view.data = [];
                draft.view.loading = false;
                draft.view.loaded = false;
                draft.view.message = action.error;
                break;
            }
            case NOTE_ALL_LIST_REQUEST: {
                draft.list.data = [];
                draft.list.loading = true;
                draft.list.loaded = false;
                draft.list.message = null;
                break;
            }
            case NOTE_ALL_LIST_SUCCESS: {
                draft.list.data = action.data;
                draft.list.loading = false;
                draft.list.loaded = true;
                draft.list.message = null;
                break;
            }
            case NOTE_ALL_LIST_FAILURE: {
                draft.list.data = [];
                draft.list.loading = false;
                draft.list.loaded = false;
                draft.list.message = action.error;
                break;
            }
            default: {
                break;
            }
        }
    })
);

export default reducer;
