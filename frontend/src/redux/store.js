import { configureStore } from '@reduxjs/toolkit';
import apiMiddleware from '../middleware/api';
import resourcesReducer from '../pages/resources/reducer';
import inspectionsReducer from '../pages/inspections/reducer';

const store = configureStore({
    middleware: [apiMiddleware],
    reducer: {
        resources: resourcesReducer,
        inspections: inspectionsReducer
    }
});
export default store;