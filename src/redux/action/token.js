import { createAction } from '@reduxjs/toolkit';

const actionToken = {
    setToken: createAction('token/setToken'),
};

export default actionToken;