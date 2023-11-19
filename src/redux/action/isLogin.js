import { createAction } from '@reduxjs/toolkit';

const actionIsLogin = {
    login: createAction('isLogin/login'),
    logout: createAction('isLogin/logout'),
};

export default actionIsLogin;