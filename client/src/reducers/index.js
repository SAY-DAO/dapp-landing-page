import { combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import needReducer from "./needReducer";
import walletReducer from "./walletReducer"

export default combineReducers({
    wallet: walletReducer,
    need: needReducer,
    form: formReducer
});


