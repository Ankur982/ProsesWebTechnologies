import { ERROR, LOADING, LOGGED_USER_NAME, LOGIN, LOGOUT, } from "./actionType";
import axios from "axios";

export const loginUser = (user) => async (dispatch) => {
    dispatch({
        type: LOADING
    });

    try {
        const res = await axios.post("http://localhost:8080/auth/login", {
            email: user.email,
            password: user.password,
        })

        dispatch({
            type: LOGIN,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const getLoggedUserName = (token) => async (dispatch) => {
    dispatch({
        type: LOADING
    });

    try {
        const res = fetch("http://localhost:8080/auth/getuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch({
                    type: LOGGED_USER_NAME,
                    payload: res
                })
            })
            .catch((err) => {
                console.error("Error:", err);
            });



    } catch (error) {
        dispatch({
            type: ERROR
        })
    }
}


export const logoutUser = () => ({
    type: LOGOUT
});