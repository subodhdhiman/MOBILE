// errorTypes.js
export const SET_CYCLE = "SET_CYCLE";

// Actions.js
export function setCYCLE(cycle){
 return {
 type: SET_CYCLE,
 payload
 }
}

// Reducer.js

const initialState = {
 minutes: 0,
 seconds: 0,
};

const TimeoutReducer = (state = initialState, action) => {

 

  switch (action.type) {
    case "SET_CYCLE":
      if (state.seconds > 0) {
        console.log('Seconds :: ', seconds)
        return { ...state, seconds: state.seconds - 1 };
      }
      if (state.minutes > 0) {
        console.log('Minutes :: ', minutes)
        return { ...state, minutes: state.minutes - 1, seconds: 60 };
      }
    case "newState":
      return action.payload;
    default:
      throw new Error();
  }
}

export default TimeoutReducer