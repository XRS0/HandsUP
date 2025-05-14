import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; 

import rootSaga from './root.saga';
import rootReducer from './root.reducer';
import { websocketMiddleware } from '../../entities/websocket/websocket-middleware';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat([
      websocketMiddleware,
      sagaMiddleware
    ])
});

sagaMiddleware.run(rootSaga);

//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;