import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '../features/vacancies/slice';

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
