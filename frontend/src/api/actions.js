import config from '../config'
import { API, API_START, API_END, ACCESS_DENIED, API_ERROR } from './types';

export function apiAction({
  resource = '',
  method = 'GET',
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  carry = null,
  headersOverride = null
}) {
  const url = `${config.apiBaseUrl}${resource}`
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      carry,
      headersOverride
    }
  };
}


export const apiStart = (carry) => ({
  type: API_START,
  payload: carry
});

export const apiEnd = (carry) => ({
  type: API_END,
  payload: carry
});

export const accessDenied = (url) => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = (error) => ({
  type: API_ERROR,
  error
});