import {
    GET_INSPECTIONS,
    GET_INSPECTIONS_SUCCESS,
    GET_INSPECTIONS_FAILED
  } from './types';
  import { apiAction } from '../../api/actions';
  
  export function getInspections(data) {
    return apiAction({
      resource: '/inspections/get-inspections',
      data,
      method: 'POST',
      onSuccess: (data) => onGetSuccess(data),
      onFailure: (error) => onGetFailed(error),
      carry: {
        label: GET_INSPECTIONS
      },
    });
  }
  
  function onGetSuccess(data) {
    return {
      type: GET_INSPECTIONS_SUCCESS,
      payload: data
    };
  }
  
  function onGetFailed(error) {
    return {
      type: GET_INSPECTIONS_FAILED,
      payload: {
        error
      }
    };
  }