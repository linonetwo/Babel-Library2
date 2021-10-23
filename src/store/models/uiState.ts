/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createModel } from '@rematch/core';
import type { RootModel } from './index';

interface IUIState {
  selectedItemIDs: string[];
}

/**
 * 管理边栏UI的状态
 */
export const uiState = createModel<RootModel>()({
  state: { selectedItemIDs: [] } as IUIState,
  reducers: {
    selectedItemIDsSetter(state, selectedItemIDs: string[]) {
      state.selectedItemIDs = selectedItemIDs;
      return state;
    },
  },
});
