import { combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import needReducer from "./needReducer";

export default combineReducers({
    need: needReducer,
    form: formReducer
});


