import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

// redux
import rootReducer from './reducer/root';

export const store = createStore(rootReducer);
persistStore(store);
