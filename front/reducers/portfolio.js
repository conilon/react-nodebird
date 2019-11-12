import produce from 'immer';

const initialState = {
    fileLists: [], // 파일리스트
    portfolioLists: [], // 포트폴리오 데이터
    addedPortfolio: [], // 데이터 여부로 포트폴리오 관리페이지로 이동 시키기 위한 변수
    singlePortfolio: [],
};

export const ADD_PORTFOLIO_REQUEST = 'ADD_PORTFOLIO_REQUEST';
export const ADD_PORTFOLIO_SUCCESS = 'ADD_PORTFOLIO_SUCCESS';
export const ADD_PORTFOLIO_FAILURE = 'ADD_PORTFOLIO_FAILURE';

export const LOAD_MAIN_PORTFOLIOS_REQUEST = 'LOAD_MAIN_PORTFOLIOS_REQUEST';
export const LOAD_MAIN_PORTFOLIOS_SUCCESS = 'LOAD_MAIN_PORTFOLIOS_SUCCESS';
export const LOAD_MAIN_PORTFOLIOS_FAILURE = 'LOAD_MAIN_PORTFOLIOS_FAILURE';

export const TOGGLE_PORTFOLIO_REQUEST = 'TOGGLE_PORTFOLIO_REQUEST';
export const TOGGLE_PORTFOLIO_SUCCESS = 'TOGGLE_PORTFOLIO_SUCCESS';
export const TOGGLE_PORTFOLIO_FAILURE = 'TOGGLE_PORTFOLIO_FAILURE';

export const LOAD_PORTFOLIO_REQUEST = 'LOAD_PORTFOLIO_REQUEST';
export const LOAD_PORTFOLIO_SUCCESS = 'LOAD_PORTFOLIO_SUCCESS';
export const LOAD_PORTFOLIO_FAILURE = 'LOAD_PORTFOLIO_FAILURE';

export const UPLOAD_IMAGE_LIST = 'UPLOAD_IMAGE_LIST';
export const REMOVE_IMAGE_LIST = 'REMOVE_IMAGE_LIST';

export const REMOVE_ADDED_PORTFOLIO = 'REMOVE_REGISTERED_PORTFOLIO'; // 관리페이지로 이동 후 addedPortfolio의 데이터를 비운다.

const reducer = (state = initialState, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case LOAD_PORTFOLIO_REQUEST: {
                break;
            }
            case LOAD_PORTFOLIO_SUCCESS: {
                draft.singlePortfolio = action.data;
                break;
            }
            case LOAD_PORTFOLIO_FAILURE: {
                break;
            }
            case TOGGLE_PORTFOLIO_REQUEST: {
                break;
            }
            case TOGGLE_PORTFOLIO_SUCCESS: {
                const portfolioIndex = draft.portfolioLists.findIndex((v) => v.id === action.portfolioId);
                draft.portfolioLists[portfolioIndex].visible = action.data;
                break;
            }
            case TOGGLE_PORTFOLIO_FAILURE: {
                break;
            }
            case LOAD_MAIN_PORTFOLIOS_REQUEST: {
                break;
            }
            case LOAD_MAIN_PORTFOLIOS_SUCCESS: {
                draft.portfolioLists = action.data;
                break;
            }
            case LOAD_MAIN_PORTFOLIOS_FAILURE: {
                break;
            }
            case ADD_PORTFOLIO_REQUEST: {
                break;
            }
            case ADD_PORTFOLIO_SUCCESS: {
                draft.addedPortfolio.push(action.data);
                break;
            }
            case ADD_PORTFOLIO_FAILURE: {
                break;
            }
            case REMOVE_ADDED_PORTFOLIO: {
                draft.addedPortfolio = [];
                break;
            }
            case UPLOAD_IMAGE_LIST: {
                draft.fileLists.push(action.data);
                break;
            }
            case REMOVE_IMAGE_LIST: {
                const index = draft.fileLists.findIndex((v, i) => i === action.index);
                draft.fileLists.splice(index, 1);
                break;
            }
            default: {
                break;
            }
        }
    })
);

export default reducer;
