/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createModel } from '@rematch/core';
import type { RootModel } from './index';

interface IBookState {
  currentSkimThroughReadContent: string[];
  currentDetailedReadTemplate: string | undefined;
  currentDetailedReadContent: string[];
}

/**
 * 管理当前在读的书的状态
 */
export const bookState = createModel<RootModel>()({
  state: { skimThroughReadingContent: [] } as IBookState,
  reducers: {
    skimThroughReadingContentSetter(state, skimThroughReadingContent: string[]) {
      state.skimThroughReadingContent = skimThroughReadingContent;
      return state;
    },
  },
});
