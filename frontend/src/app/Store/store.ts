import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; 

import rootSaga from './root.saga';
import rootReducer from './root.reducer';
import { socketMiddleware } from '@/entities/websocket/middleware';
import Socket from '@/entities/websocket/models/socket';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/getUser'],
        ignoredActionPaths: ['meta.navigate'],
      },
    })
    .concat([
      socketMiddleware(new Socket()),
      sagaMiddleware
    ])
});

sagaMiddleware.run(rootSaga);

//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;