// redux
import actionIsLogin from '../action/isLogin';

const initialState = false;
const reducerIsLogin = (state = initialState, action) => {
    switch (action.type) {
        case actionIsLogin.login.type:
            return true;
        case actionIsLogin.logout.type:
            return false;

    }
    return state;
};

export default reducerIsLogin;