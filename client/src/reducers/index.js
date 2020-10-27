import { combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import needReducer from "./needReducer";
import walletReducer from "./walletReducer"
import nakamaReducer from "./nakamaReducer";

export default combineReducers({
    wallet: walletReducer,
    tokens: nakamaReducer,
    need: needReducer,
    form: formReducer
});


