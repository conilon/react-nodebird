import produce from 'immer';

const initialState = {
    list: {
        data: [],
    },
    
    categories: {
        note: [],
    },

    // data
    menuNoteCategories: [],
    noteCategories: [],
    singleNoteCategory: [],
    
    // success
    addedNoteCategory: false,
    loadedMenuNoteCategories: false,
    loadedNoteCategories: false,
    loadedSingleNoteCategory: false,
    modifiedNoteCategory: false,
    toggledNoteCategory: false,
    
    // loading
    loadingMenuNoteCategories: false,
    loadingNoteCategories: false,

    // failure
    addNoteCategoryErrorMessage: null,
    loadMenuNoteCategoriesErrorMessage: null,
    loadNoteCategoriesErrorMessage: null,
    loadSingleNoteCategoryErrorMessage: null,
    modifyNoteCategoryErrorMessage: null,
    toggleNoteCategoryErrorMessage: null,
};

export const LOAD_MENU_NOTE_CATEGORIES_REQUEST = 'LOAD_MENU_NOTE_CATEGORIES_REQUEST';
export const LOAD_MENU_NOTE_CATEGORIES_SUCCESS = 'LOAD_MENU_NOTE_CATEGORIES_SUCCESS';
export const LOAD_MENU_NOTE_CATEGORIES_FAILURE = 'LOAD_MENU_NOTE_CATEGORIES_FAILURE';

export const LOAD_NOTE_CATEGORIES_REQUEST = 'LOAD_NOTE_CATEGORIES_REQUEST';
export const LOAD_NOTE_CATEGORIES_SUCCESS = 'LOAD_NOTE_CATEGORIES_SUCCESS';
export const LOAD_NOTE_CATEGORIES_FAILURE = 'LOAD_NOTE_CATEGORIES_FAILURE';

export const ADD_NOTE_CATEGORY_REQUEST = 'ADD_NOTE_CATEGORY_REQUEST';
export const ADD_NOTE_CATEGORY_SUCCESS = 'ADD_NOTE_CATEGORY_SUCCESS';
export const ADD_NOTE_CATEGORY_FAILURE = 'ADD_NOTE_CATEGORY_FAILURE';

export const TOGGLE_NOTE_CATEGORY_VISIBLE_REQUEST = 'TOGGLE_NOTE_CATEGORY_VISIBLE_REQUEST';
export const TOGGLE_NOTE_CATEGORY_VISIBLE_SUCCESS = 'TOGGLE_NOTE_CATEGORY_VISIBLE_SUCCESS';
export const TOGGLE_NOTE_CATEGORY_VISIBLE_FAILURE = 'TOGGLE_NOTE_CATEGORY_VISIBLE_FAILURE';

export const MODIFY_NOTE_CATEGORY_REQUEST = 'MODIFY_NOTE_CATEGORY_REQUEST';
export const MODIFY_NOTE_CATEGORY_SUCCESS = 'MODIFY_NOTE_CATEGORY_SUCCESS';
export const MODIFY_NOTE_CATEGORY_FAILURE = 'MODIFY_NOTE_CATEGORY_FAILURE';

export const SINGLE_LOAD_NOTE_CATEGORY_REQUEST = 'SINGLE_LOAD_NOTE_CATEGORY_REQUEST';
export const SINGLE_LOAD_NOTE_CATEGORY_SUCCESS = 'SINGLE_LOAD_NOTE_CATEGORY_SUCCESS';
export const SINGLE_LOAD_NOTE_CATEGORY_FAILURE = 'SINGLE_LOAD_NOTE_CATEGORY_FAILURE';

export const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST';
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE';

const reducer = (state = initialState, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case CATEGORY_LIST_REQUEST: {
                draft.list.data = [];
                break;
            }
            case CATEGORY_LIST_SUCCESS: {
                draft.list.data = action.data;
                break;
            }
            case CATEGORY_LIST_FAILURE: {
                draft.list.data = [];
                break;
            }

            case LOAD_MENU_NOTE_CATEGORIES_REQUEST: {
                draft.categories.note = [];

                draft.menuNoteCategories = [];
                draft.loadedMenuNoteCategories = false;
                draft.loadingMenuNoteCategories = true;
                draft.loadMenuNoteCategoriesErrorMessage = null;

                draft.modifiedNoteCategory = false;
                draft.toggledNoteCategory = false;
                break;
            }
            case LOAD_MENU_NOTE_CATEGORIES_SUCCESS: {
                draft.categories.note = action.data;

                draft.menuNoteCategories = action.data;
                draft.loadedMenuNoteCategories = true;
                draft.loadingMenuNoteCategories = false;
                draft.loadMenuNoteCategoriesErrorMessage = null;
                break;
            }
            case LOAD_MENU_NOTE_CATEGORIES_FAILURE: {
                draft.menuNoteCategories = [];
                draft.loadedMenuNoteCategories = false;
                draft.loadingMenuNoteCategories = false;
                draft.loadMenuNoteCategoriesErrorMessage = action.error;
                break;
            }
            case LOAD_NOTE_CATEGORIES_REQUEST: {
                draft.noteCategories = [];
                draft.loadedNoteCategories = true;
                draft.loadingNoteCategories = true;
                draft.loadNoteCategoriesErrorMessage = null;
                break;
            }
            case LOAD_NOTE_CATEGORIES_SUCCESS: {
                draft.noteCategories = action.data;
                draft.loadedNoteCategories = false;
                draft.loadingNoteCategories = false;
                draft.loadNoteCategoriesErrorMessage = null;
                break;
            }
            case LOAD_NOTE_CATEGORIES_FAILURE: {
                draft.noteCategories = [];
                draft.loadedNoteCategories = false;
                draft.loadingNoteCategories = false;
                draft.loadNoteCategoriesErrorMessage = action.error;
                break;
            }
            case ADD_NOTE_CATEGORY_REQUEST: {
                draft.addedNoteCategory = false;
                draft.addNoteCategoryErrorMessage = null;
                break;
            }
            case ADD_NOTE_CATEGORY_SUCCESS: {
                draft.addedNoteCategory = true;
                break;
            }
            case ADD_NOTE_CATEGORY_FAILURE: {
                draft.addedNoteCategory = false;
                draft.addNoteCategoryErrorMessage = action.error;
                break;
            }
            case TOGGLE_NOTE_CATEGORY_VISIBLE_REQUEST: {
                draft.toggledNoteCategory = false;
                draft.toggleNoteCategoryErrorMessage = null;
                break;
            }
            case TOGGLE_NOTE_CATEGORY_VISIBLE_SUCCESS: {
                const noteCategoryIndex = draft.noteCategories.rows.findIndex((v) => v.id === action.categoryId);
                draft.noteCategories.rows[noteCategoryIndex].visible = action.data;
                draft.toggledNoteCategory = true;
                break;
            }
            case TOGGLE_NOTE_CATEGORY_VISIBLE_FAILURE: {
                draft.toggledNoteCategory = false;
                draft.toggleNoteCategoryErrorMessage = action.error;
                break;
            }
            case MODIFY_NOTE_CATEGORY_REQUEST: {
                draft.modifiedNoteCategory = false;
                draft.modifyNoteCategoryErrorMessage = null;
                break;
            }
            case MODIFY_NOTE_CATEGORY_SUCCESS: {
                draft.modifiedNoteCategory = true;
                break;
            }
            case MODIFY_NOTE_CATEGORY_FAILURE: {
                draft.modifiedNoteCategory = false;
                draft.modifyNoteCategoryErrorMessage = action.error;
                break;
            }
            case SINGLE_LOAD_NOTE_CATEGORY_REQUEST: {
                draft.singleNoteCategory = [];
                draft.loadedSingleNoteCategory = false;
                draft.loadSingleNoteCategoryErrorMessage = null;
                break;
            }
            case SINGLE_LOAD_NOTE_CATEGORY_SUCCESS: {
                draft.singleNoteCategory = action.data;
                draft.loadedSingleNoteCategory = true;
                draft.loadSingleNoteCategoryErrorMessage = null;
                break;
            }
            case SINGLE_LOAD_NOTE_CATEGORY_FAILURE: {
                draft.singleNoteCategory = [];
                draft.loadedSingleNoteCategory = false;
                draft.loadSingleNoteCategoryErrorMessage = action.error;
                break;
            }
            default: {
                break;
            }
        }
    })
);

export default reducer;
