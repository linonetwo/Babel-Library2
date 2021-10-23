/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createModel } from '@rematch/core';
import type { RootModel } from './index';

interface IUIState {
  /**
   * 当前在玩的背景故事
   */
  currentScenario: string;
  endingText: string[];
  guideText: string[];
  scenarios: Array<{ description: string; id: string; name: string }>;
}

/**
 * 管理UI和文案的状态
 */
export const uiState = createModel<RootModel>()({
  state: {
    currentScenario: 'alien',
    scenarios: [
      {
        name: '评价地球文明的外星人',
        id: 'alien',
        description:
          '你是一个来自其他文明的侦查员，通过量子爬虫爬取了地球的所有信息，生成了这座“图书馆”；你需要通过这些信息生成的书籍对地球文明进行评估，决定他们的命运...',
      },
    ],
    guideText: [],
    endingText: [],
  } as IUIState,
  reducers: {
    guideTextSetter(state, guideText: string[]) {
      state.guideText = guideText;
      return state;
    },
    endingTextSetter(state, endingText: string[]) {
      state.endingText = endingText;
      return state;
    },
  },
  effects: (dispatch) => ({
    async loadGuideText(payload, rootState) {
      const currentScenario = rootState.uiState.currentScenario;
      const newGuideTextContent = await fetch(`/public/data/${currentScenario}/guide.md`).then(async (response) => await response.text());
      dispatch.uiState.guideTextSetter(newGuideTextContent.split('\n'));
    },
  }),
});
