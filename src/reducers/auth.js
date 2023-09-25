import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    ORDER_LOADED_SUCCESS,
    ORDER_LOADED_FAIL,
    LOGOUT
} from '../actions/types';
import { Navigate } from 'react-router-dom';

const initialState = {
    access: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('first_name', payload.user.first_name)
            localStorage.setItem('last_name', payload.user.last_name)
            localStorage.setItem('middle_name', payload.user.profile.middle_name)
            localStorage.setItem('token', payload.token)
            localStorage.setItem('groups', payload.user.groups.map(role => role)[0])
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthenticated: false,
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
            return {
                ...state,
                access: null,
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