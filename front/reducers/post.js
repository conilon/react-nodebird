const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'th',
        },
        content: '첫 번째 게시글',
        img: 'https://w.namu.la/s/992a8aba82a1e00dd3f120bf3ff3e94a54e5a2cc70cd011c05b1e6abebfc715c261e3d5b719a30d4e2941180a43d44ff4ebc57b282475caa1fff82cb55bc5142efefa9cd1d754dbb98b7f29db282e3f66bcb5b12555bda684c75cce46179f2ca0be016c7d77ba5db8721608208963616',
    }],
    imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
    type: ADD_POST,
}

export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        user: {
            nickname: 'th',
        },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
            };
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
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
