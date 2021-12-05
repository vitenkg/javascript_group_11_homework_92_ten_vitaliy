import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const LOGOUT_USER = "LOGOUT_USER";

export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});


export const loginUserRequest = user => ({type: LOGIN_USER_REQUEST, payload: user});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});


export const registerUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess(response.data));
            dispatch(historyPush('/chat'));
            toast.success('Register successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const fetchLogin = data => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', data);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush('/chat'));
            toast.success('Login successful');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet Connections'}));
            }

        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        await axiosApi.delete('/users/sessions', {
            headers: {
                'Authorization': getState().users.user && getState().users.user.token,
            },
        });
        dispatch({type: LOGOUT_USER});
        dispatch(historyPush('/'));
    };
};