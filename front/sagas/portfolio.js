import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { 
    ADD_PORTFOLIO_REQUEST, ADD_PORTFOLIO_SUCCESS, ADD_PORTFOLIO_FAILURE, 
    LOAD_MAIN_PORTFOLIOS_REQUEST, LOAD_MAIN_PORTFOLIOS_SUCCESS, LOAD_MAIN_PORTFOLIOS_FAILURE,
    TOGGLE_PORTFOLIO_REQUEST, TOGGLE_PORTFOLIO_SUCCESS, TOGGLE_PORTFOLIO_FAILURE,
    LOAD_PORTFOLIO_REQUEST, LOAD_PORTFOLIO_SUCCESS, LOAD_PORTFOLIO_FAILURE,
    REMOVE_ADDED_PORTFOLIO,
} from '../reducers/portfolio';

function addPortfolioAPI(portfolioData) {
    console.log('portfolioData:', portfolioData);
    return axios.post('/portfolio', portfolioData, {
        withCredentials: true,
    });
}

function* addPortfolio(action) {
    try {
        const result = yield call(addPortfolioAPI, action.data);
        yield put({
            type: ADD_PORTFOLIO_SUCCESS,
            data: result.data,
        });
        yield put({ type: REMOVE_ADDED_PORTFOLIO });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_PORTFOLIO_FAILURE,
            error: e,
        });
    }
}

function* watchAddPortfolio() {
    yield takeLatest(ADD_PORTFOLIO_REQUEST, addPortfolio);
}

function loadMainPortfoliosAPI() {
    return axios.get('/portfolios');
}

function* loadMainPortfolios() {
    try {
        const result = yield call(loadMainPortfoliosAPI);
        yield put({
            type: LOAD_MAIN_PORTFOLIOS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_MAIN_PORTFOLIOS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadMainPortfolios() {
    yield takeLatest(LOAD_MAIN_PORTFOLIOS_REQUEST, loadMainPortfolios);
}

function togglePortfolioAPI(portfolioId, visible) {
    return axios.patch('/portfolio/visible', { portfolioId, visible }, {
        withCredentials: true,
    });
}

function* togglePortfolio(action) {
    try {
        const result = yield call(togglePortfolioAPI, action.portfolioId, action.visible);
        yield put({
            type: TOGGLE_PORTFOLIO_SUCCESS,
            data: result.data,
            portfolioId: action.portfolioId,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: TOGGLE_PORTFOLIO_FAILURE,
            erorr: e,
        });
    }
}

function* watchTogglePortfolio() {
    yield takeLatest(TOGGLE_PORTFOLIO_REQUEST, togglePortfolio);
}

function loadPortfolioAPI(portFolioId) {
    return axios.get(`/portfolio/${portFolioId}`);
}

function* loadPortfolio(action) {
    try {
        const result = yield call(loadPortfolioAPI, action.data);
        yield put({
            type: LOAD_PORTFOLIO_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_PORTFOLIO_FAILURE,
            error: e,
        });
    }
}

function* watchLoadPortfolio() {
    yield takeLatest(LOAD_PORTFOLIO_REQUEST, loadPortfolio);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPortfolio),
        fork(watchLoadMainPortfolios),
        fork(watchTogglePortfolio),
        fork(watchLoadPortfolio),
    ]);
}
