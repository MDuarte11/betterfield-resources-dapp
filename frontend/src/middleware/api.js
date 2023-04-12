import axios from 'axios';
import { API } from '../api/types';
import { accessDenied, apiError, apiStart, apiEnd } from '../api/actions';

const apiMiddleware =
  ({ dispatch }) =>
    (next) =>
      async (action) => {
        next(action);

        if (action.type !== API) return;

        const { url, method, data, onSuccess, onFailure, carry, headers } = action.payload;
        const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

        // axios default configs
        axios.defaults.baseURL = process.env.REACT_API_BASE_URL || '';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        if (carry) {
          dispatch(apiStart(carry));
        }

        let requestHeaders = null;
        if (headers == null) {
          requestHeaders = axios.defaults.headers.common;
        }

        axios
          .request({
            url,
            method,
            requestHeaders,
            [dataOrParams]: data
          })
          .then(({ data }) => {
            dispatch(onSuccess(data));
          })
          .catch((error) => {
            dispatch(apiError(error));
            dispatch(onFailure(error));
  
            if (error.response && error.response.status === 403) {
                dispatch(accessDenied(window.location.pathname));
            }
          })
          .finally(() => {
            if (carry) {
              dispatch(apiEnd(carry));
            }
          });
      };

export default apiMiddleware;