import {
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAILED,
  } from './types';
  
  const initialState = {
    current: {}
  };
  
  export default function resourcesReducer(action = {}, state = initialState) {
    switch (action.type) {
      case GET_RESOURCES_SUCCESS:
        return {
          ...initialState,
          current: action.payload,
        };
      case GET_RESOURCES_FAILED:
        return {
          ...initialState,
          error: action.payload
        };
      default:
        break;
    }
    return state;
  }