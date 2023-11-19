import React, { Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import actionToken from "../../redux/action/token";
import actionIsLogin from "../../redux/action/isLogin";
import LoginAPI from "../../api/login"


const Login = ({ state, login, changeLoginToken }) => {
    const [loginInformation, setLoginInformation] = useState({ id: "", password: "" });

    const handleLogin = () => {
        LoginAPI.login({ id: loginInformation.id, password: loginInformation.password, envType: state.envType.envType }).then((data) => {
            if (data.accessToken) {
                changeLoginToken(data.accessToken)
                login();
            }
        });
    }

    return (<>
        {state.token.token === '' || !state.isLogin ?
            <div className="fixed top-0 h-full w-full bg-green-300 z-[100] flex items-center justify-center">
                <div className="border-4 max-w-[400px] max-h-[300px] justify-center p-8 flex flex-col gap-4 items-center">
                    <p className="text-3xl text-center">로그인</p>
                    <div className="flex flex-col gap-1">
                        <div>
                            <label
                                className="inline-block min-w-[100px] text-center">ID
                            </label>
                            <input type="text" className="border-black border"
                                value={loginInformation.id}
                                onChange={(e) => {
                                    setLoginInformation({ ...loginInformation, id: e.target.value });
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label className="inline-block min-w-[100px] text-center">PASSWORD</label>
                            <input type="password"
                                className="border-black border"
                                value={loginInformation.password}
                                onChange={(e) => {
                                    setLoginInformation({ ...loginInformation, password: e.target.value });
                                }}
                                required
                            />
                        </div>
                    </div>
                    <button onClick={() => { handleLogin() }} className="bg-white p-2 rounded-md w-full hover:bg-gray-100"> 로그인 </button>
                </div>
            </div>
            : ''}
    </>
    )
}

const mapStateToProps = (state, OwnProps) => {
    return { state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
    return {
        changeLoginToken: (token) => {
            dispatch(actionToken.setToken(token));
        },
        login: () => {
            dispatch(actionIsLogin.login());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);