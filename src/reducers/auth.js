import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    /*PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,*/
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    /*GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,*/
    ORDER_LOADED_SUCCESS,
    ORDER_LOADED_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('token'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    orders: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            //localStorage.setItem('orders', payload)
            localStorage.setItem('first_name', payload.user.first_name)
            localStorage.setItem('last_name', payload.user.last_name)
            localStorage.setItem('middle_name', payload.user.profile.middle_name)
            localStorage.setItem('balance', payload.user.profile.balance)
            localStorage.setItem('token', payload.token);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case ORDER_LOADED_SUCCESS:
            return {
                ...state,
                orders: payload
            }
        case ORDER_LOADED_FAIL:
            return{
                ...state,
                orders: null
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};