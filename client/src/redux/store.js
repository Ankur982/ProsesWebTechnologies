import { combineReducers, legacy_createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { userReducer } from "./user/reducer";




const rootReducer = combineReducers({
    user: userReducer
});




export const store = legacy_createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

