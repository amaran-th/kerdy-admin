import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerEnvType from './envType';
import reducerToken from './token';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['envType', 'token', 'member', 'ctf', 'vote'],
};

const rootReducer = combineReducers({
    envType: reducerEnvType,
    token: reducerToken
});

export default persistReducer(persistConfig, rootReducer);