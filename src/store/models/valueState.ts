/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createModel } from '@rematch/core';
import type { RootModel } from './index';

interface IValueState {
  scores: number[];
}

/**
 * 管理当前在读的书的状态
 */
export const valueState = createModel<RootModel>()({
  state: {
    scores: [],
  } as IValueState,
  reducers: {
    updateDetailedTemplateMenu(state, newMenu: string[]) {
      return state;
    },
  },
  effects: (dispatch) => ({
    async startNewSkimThroughRead(payload, rootState) {},
  }),
});
