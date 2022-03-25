import {combineReducers} from 'redux'
// import AuthReducer from './AuthReducer';
 import ContactReducer from './ContactReducer';
import AuthReducer from '../../pages/Auth/Store/reducer'
import UserReducer from '../../pages/User/Store/reducer'
import CallReducer from '../../pages/Calls/Store/reducer'
import ErrorReducer from '../../common/ErrorHandler'

const RootReducer = combineReducers({
    errorReducer : ErrorReducer,
    contactReducer: ContactReducer,
    authReducer: AuthReducer,
    userReducer: UserReducer,
    callReducer: CallReducer
});

export default RootReducer