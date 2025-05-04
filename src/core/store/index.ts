import { configureStore } from '@reduxjs/toolkit';
import { domainsApi } from 'core/store/services/domains';

// Slices
const store = configureStore({
  reducer: {
    [domainsApi.reducerPath]: domainsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainsApi.middleware),
});

export default store;
