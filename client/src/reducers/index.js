import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import needReducer from './needReducer';
import walletReducer from './walletReducer';
import nakamaReducer from './nakamaReducer';
import ethReducer from './ethReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  wallet: walletReducer,
  tokens: nakamaReducer,
  need: needReducer,
  form: formReducer,
  ethPrice: ethReducer,
  modal: modalReducer,
});
