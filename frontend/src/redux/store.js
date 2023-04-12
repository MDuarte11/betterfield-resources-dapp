import { configureStore } from '@reduxjs/toolkit';
import apiMiddleware from '../middleware/api';
import resourcesReducer from '../pages/resources/reducer';

const store = configureStore({
    middleware: [apiMiddleware],
    reducer: {
        resources: resourcesReducer
    }
});
export default store;