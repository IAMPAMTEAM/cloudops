import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userReducer from './auth';
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    userReducer,
});
export default configureStore({
    reducer: rootReducer,
});
