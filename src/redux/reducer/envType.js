// redux
import actionEnvType from '../action/envType';

const initialState = { envType: 'prod' };
const reducerEnvType = (state = initialState, action) => {
    switch (action.type) {
        case actionEnvType.updateCurrent.type:
            return { ...state, envType: action.payload };
    }
    return state;
};

export default reducerEnvType;