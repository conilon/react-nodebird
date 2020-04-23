import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  count: 0,
  ing: false,
  ed: false,
  message: null,
};

export const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST';
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE';

export const ADMIN_CATEGORY_LIST_REQUEST = 'ADMIN_CATEGORY_LIST_REQUEST';
export const ADMIN_CATEGORY_LIST_SUCCESS = 'ADMIN_CATEGORY_LIST_SUCCESS';
export const ADMIN_CATEGORY_LIST_FAILURE = 'ADMIN_CATEGORY_LIST_FAILURE';

export const ADMIN_CATEGORY_PAGE_LIST_REQUEST = 'ADMIN_CATEGORY_PAGE_LIST_REQUEST';
export const ADMIN_CATEGORY_PAGE_LIST_SUCCESS = 'ADMIN_CATEGORY_PAGE_LIST_SUCCESS';
export const ADMIN_CATEGORY_PAGE_LIST_FAILURE = 'ADMIN_CATEGORY_PAGE_LIST_FAILURE';

export const ADMIN_CATEGORY_VIEW_REQUEST = 'ADMIN_CATEGORY_VIEW_REQUEST';
export const ADMIN_CATEGORY_VIEW_SUCCESS = 'ADMIN_CATEGORY_VIEW_SUCCESS';
export const ADMIN_CATEGORY_VIEW_FAILURE = 'ADMIN_CATEGORY_VIEW_FAILURE';

export const ADMIN_CATEGORY_EDIT_REQUEST = 'ADMIN_CATEGORY_EDIT_REQUEST';
export const ADMIN_CATEGORY_EDIT_SUCCESS = 'ADMIN_CATEGORY_EDIT_SUCCESS';
export const ADMIN_CATEGORY_EDIT_FAILURE = 'ADMIN_CATEGORY_EDIT_FAILURE';

export const ADMIN_CATEGORY_CREATE_REQUEST = 'ADMIN_CATEGORY_CREATE_REQUEST';
export const ADMIN_CATEGORY_CREATE_SUCCESS = 'ADMIN_CATEGORY_CREATE_SUCCESS';
export const ADMIN_CATEGORY_CREATE_FAILURE = 'ADMIN_CATEGORY_CREATE_FAILURE';

const reducer = (state = INITIAL_STATE, action) => (
  produce(state, (draft) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST: {
        draft.data = [];
        draft.count = 0;
        draft.ing = true;
        draft.ed = false;
        draft.message = null;
        break;
      }
      case CATEGORY_LIST_SUCCESS: {
        draft.data = action.data;
        draft.ing = false;
        draft.ed = true;
        draft.message = null;
        break;
      }
      case CATEGORY_LIST_FAILURE: {
        draft.data = [];
        draft.count = 0;
        draft.ing = false;
        draft.ed = false;
        draft.message = null;
        break;
      }

      
        case ADMIN_CATEGORY_LIST_REQUEST: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_LIST_SUCCESS: {
            draft.data = action.data;
            break;
        }
        case ADMIN_CATEGORY_LIST_FAILURE: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_PAGE_LIST_REQUEST: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_PAGE_LIST_SUCCESS: {
            draft.data = action.data;
            break;
        }
        case ADMIN_CATEGORY_PAGE_LIST_FAILURE: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_VIEW_REQUEST: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_VIEW_SUCCESS: {
            draft.data = action.data;
            break;
        }
        case ADMIN_CATEGORY_VIEW_FAILURE: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_EDIT_REQUEST: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_EDIT_SUCCESS: {
            draft.data = action.data;
            break;
        }
        case ADMIN_CATEGORY_EDIT_FAILURE: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_CREATE_REQUEST: {
            draft.data = [];
            break;
        }
        case ADMIN_CATEGORY_CREATE_SUCCESS: {
            draft.data.added = action.data;
            break;
        }
        case ADMIN_CATEGORY_CREATE_FAILURE: {
            draft.data = [];
            break;
        }
        default: {
            break;
        }
    }
  })
);

export default reducer;
