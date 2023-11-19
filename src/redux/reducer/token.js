// redux
import actionToken from '../action/token';

const initialState = { token: '' };
const reducerToken = (state = initialState, action) => {
    switch (action.type) {
        case actionToken.setToken.type:
            return { ...state, token: action.payload };
    }
    return state;
};

export default reducerToken;