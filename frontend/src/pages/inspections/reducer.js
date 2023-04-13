import {
    GET_INSPECTIONS_SUCCESS,
    GET_INSPECTIONS_FAILED,
  } from './types';
  
  const initialState = {
    current: {}
  };
  
  export default function inspectionsReducer(action = {}, state = initialState) {
    switch (action.type) {
      case GET_INSPECTIONS_SUCCESS:
        return {
          ...initialState,
          current: action.payload,
        };
      case GET_INSPECTIONS_FAILED:
        return {
          ...initialState,
          error: action.payload
        };
      default:
        break;
    }
    return state;
  }