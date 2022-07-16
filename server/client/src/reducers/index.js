import { combineReducers } from "redux";
import { reducer as reduxForm } from 'redux-form';
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,  // auth is a proporty, which has states and actions. reducer has to be assigned to a key(that is auth)
    form: reduxForm,    // reduxForm 是已经提供好的了
});