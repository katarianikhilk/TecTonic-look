import { combineReducers } from '@reduxjs/toolkit';

import baseApi from '../apis/base.api';

const reducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer
});

export default reducers;
