import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import immerPlugin from '@rematch/immer';
import persistPlugin from '@rematch/persist';
import selectPlugin from '@rematch/select';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { models, RootModel } from './models';

type FullModel = ExtraModelsFromLoading<RootModel>;
export const store = init<RootModel, FullModel>({
  models,
  plugins: [
    immerPlugin(),
    loadingPlugin(),
    persistPlugin({
      key: 'root',
      storage,
      stateReconciler: autoMergeLevel2,
      whitelist: ['uiState'],
    }),
    selectPlugin(),
  ],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
