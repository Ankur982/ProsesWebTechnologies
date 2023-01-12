import { ERROR, LOADING, LOGGED_USER_NAME, LOGIN, LOGOUT } from "./actionType"

const initState = {
    loading: false,
    error: false,
    loggedUser: "",
    loggedUserName: ""
}

export const userReducer = (state = initState, { type, payload }) => {
    switch (type) {

        case LOADING: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }

        case ERROR: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }


        case LOGIN: {
            return {
                ...state,
                loading: false,
                error: false,
                loggedUser: payload

            }
        }

        case LOGGED_USER_NAME: {
            return {
                ...state,
                loading: false,
                error: false,
                loggedUserName: payload

            }
        }


        case LOGOUT: {
            return {
                ...state,
                loading: false,
                error: false,
                loggedUser: ""
            }
        }


        default: return state
    }
}