const dummyUser = {
    nickname: 'th',
    Post: [],
    Following: [],
    Follower: [],
};

export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {
        id: '',
        nickname: '',
        password: '',
    }
};

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP_ID = 'SIGN_UP_ID';
export const SIGN_UP_NICKNAME = 'SIGN_UP_NICKNAME';
export const SIGN_UP_PASSWORD = 'SIGN_UP_PASSWORD';

export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data,
    };
};

export const loginAction = {
    type: LOG_IN,
};

export const logoutAction = {
    type: LOG_OUT,
};

export const signUpId = (data) => {
    return {
        type: SIGN_UP_ID,
        data,
    };
};

export const signUpNickname = (data) => {
    return {
        type: SIGN_UP_NICKNAME,
        data,
    };
};

export const signUpPassword = (data) => {
    return {
        type: SIGN_UP_PASSWORD,
        data,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                signUpData: action.data,
            };
        }
        case SIGN_UP_ID: {
            return {
                ...state,
                signUpData: {
                    ...state.signUpData,
                    id: action.data,
                }
            };
        }
        case SIGN_UP_NICKNAME: {
            return {
                ...state,
                signUpData: {
                    ...state.signUpData,
                    nickname: action.data,
                }
            };
        }
        case SIGN_UP_PASSWORD: {
            return {
                ...state,
                signUpData: {
                    ...state.signUpData,
                    password: action.data,
                }
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default reducer;
