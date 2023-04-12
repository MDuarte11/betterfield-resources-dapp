import {
    GET_RESOURCES,
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAILED
  } from './types';
  import { apiAction } from '../../api/actions';
  
  export function getResources(data) {
    return apiAction({
      resource: '/resources/get-resources',
      data,
      method: 'POST',
      onSuccess: (data) => onGetSuccess(data),
      onFailure: (error) => onGetFailed(error),
      carry: {
        label: GET_RESOURCES
      },
    });
  }
  
  function onGetSuccess(data) {
    return {
      type: GET_RESOURCES_SUCCESS,
      payload: data
    };
  }
  
  function onGetFailed(error) {
    return {
      type: GET_RESOURCES_FAILED,
      payload: {
        error
      }
    };
  }