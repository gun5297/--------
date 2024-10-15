import { configureStore } from '@reduxjs/toolkit';

import teams from './modules/teamSlice';

export const store = configureStore({
    reducer: { teams },
});
