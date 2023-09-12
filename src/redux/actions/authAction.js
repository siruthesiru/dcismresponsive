import Cookies from 'js-cookie'
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_REQUEST
} from '../types'

import AuthAPI from '../../api/Auth'
import history from '../../utils/history'

// Thunk Actions
export const login = (email, password) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })

    AuthAPI.login({ email, password })
        .then(({ data }) => {
            Cookies.set("access_token", data.token);
            Cookies.set("user_role", data.role);

            dispatch({ type: LOGIN_SUCCESS, payload: data });

            switch (data.role) {
                case "admin":
                    history.push("/admin-dashboard");
                    break;
                case "alumni":
                    history.push("/alumni-dashboard");
                    break;
                case "company":
                    history.push("/company-dashboard");
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error("Login Error: ", error);
            dispatch({ type: LOGIN_FAILURE, payload: error?.response?.data?.error });
        })
}

export const logOut = () => (dispatch) => {
    Cookies.remove("access_token");
    Cookies.remove("user_role");

    dispatch({ type: LOGOUT });
    history.push("/")
}

export const registerAlumni = (userData) => (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    AuthAPI.registerAlumni({ userData })
        .then(({ data }) => {
            dispatch({ type: REGISTER_SUCCESS, payload: data });
            history.push("/alumni-dashboard");
        })
        .catch((error) => {
            console.error("Registration Error: ", error);
            dispatch({ type: REGISTER_FAILURE, payload: error?.response?.data?.error });
        });
}

export const registerCompany = (userData) => (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    AuthAPI.registerAlumni({ userData })
        .then(({ data }) => {
            dispatch({ type: REGISTER_SUCCESS, payload: data });
            history.push("/company-dashboard");
        })
        .catch((error) => {
            console.error("Registration Error: ", error);
            dispatch({ type: REGISTER_FAILURE, payload: error?.response?.data?.error });
        });
}