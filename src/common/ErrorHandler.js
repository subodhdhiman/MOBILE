// errorTypes.js
export const SET_ERROR = "SET_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

// errorActions.js
export function setError(error){
 return {
 type: SET_ERROR,
 error: error
 }
}

export function hideError(){
 return {
 type: HIDE_ERROR
 }
}

// errorReducer.js

const initialState = {
 error: null,
 isOpen: false
};

const ErrorReducer = (state = initialState, action) => {

 const { error } = action;

 if(error){
        return {
        error: error,
        isOpen: true
    }
 }else if(action.type === HIDE_ERROR){
 return {
        error: null,
        isOpen: false
    }
 }

 return state;
}

export default ErrorReducer