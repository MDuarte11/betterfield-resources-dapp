import { configureStore } from '@reduxjs/toolkit';
import apiMiddleware from '../middleware/api';

const store = configureStore({
    middleware: [apiMiddleware],
    reducer: {}
});
export default store;