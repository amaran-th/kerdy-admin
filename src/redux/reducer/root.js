import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerEnvType from './envType';
import reducerToken from './token';
import reducerIsLogin from './isLogin';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['envType', 'token', 'isLogin', 'ctf', 'vote'],
};

const rootReducer = combineReducers({
    envType: reducerEnvType,
    token: reducerToken,
    isLogin: reducerIsLogin
});

export default persistReducer(persistConfig, rootReducer);