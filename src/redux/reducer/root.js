import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerEnvType from './envType';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['envType', 'darkMode', 'member', 'ctf', 'vote'],
};

const rootReducer = combineReducers({
    envType: reducerEnvType
});

export default persistReducer(persistConfig, rootReducer);