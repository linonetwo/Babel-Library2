/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { random, sample } from 'lodash';
import { cddaJSONWithNameAndDescription, ICDDAJSONWithNameAndDescription } from 'cdda-chinese-text-dataset';
import { IConfiguration, templateFileToNLCSTNodes, getConfigSchemaFromTemplate, IOutputWIthMetadata, randomOutlineToArrayWithMetadataCompiler } from 'tbg'
import { createModel } from '@rematch/core';
import type { RootModel } from './index';

interface IBookState {
  /** 要略读几本书才进入精读，一个范围用于随机选取 */
  skimThroughReadCountRange: [number, number];
  /** 略读的新书添加间隔 ms 时间 */
  skimThroughReadInterval: number;
  currentSkimThroughReadContent: ICDDAJSONWithNameAndDescription[];
  currentDetailedReadTemplate: string | undefined;
  currentDetailedReadContent: string[];
}

/**
 * 管理当前在读的书的状态
 */
export const bookState = createModel<RootModel>()({
  state: {
    skimThroughReadCountRange: [10, 20],
    skimThroughReadInterval: 500,
    currentSkimThroughReadContent: [],
    currentDetailedReadTemplate: undefined,
    currentDetailedReadContent: [],
  } as IBookState,
  reducers: {
    clearSkimThroughReadingContent(state) {
      state.currentSkimThroughReadContent = [];
      return state;
    },
    appendSkimThroughReadingContent(state, newSkimThroughReadingContent: ICDDAJSONWithNameAndDescription) {
      state.currentSkimThroughReadContent.push(newSkimThroughReadingContent);
      return state;
    },
    clearDetailedReadingContent(state) {
      state.currentDetailedReadContent = [];
      return state;
    },
    appendDetailedReadingContent(state, newDetailedReadingContent: string) {
      state.currentDetailedReadContent.push(newDetailedReadingContent);
      return state;
    },
  },
  effects: (dispatch) => ({
    async startNewSkimThroughRead(payload, rootState) {
      dispatch.bookState.clearSkimThroughReadingContent();
      const [min, max] = rootState.bookState.skimThroughReadCountRange;
      for (let counter = 0; counter < random(min, max); counter += 1) {
        const randomBook = sample(cddaJSONWithNameAndDescription);
        if (randomBook !== undefined) {
          dispatch.bookState.appendSkimThroughReadingContent(randomBook);
          await new Promise((resolve) => setTimeout(resolve, rootState.bookState.skimThroughReadInterval));
        } else {
          console.error(`没有抽取到合适的书籍，可能 CDDA cddaJSONWithNameAndDescription 数据集有问题`);
        }
      }
    },
    async startNewDetailedRead(payload, rootState) {
      dispatch.bookState.clearDetailedReadingContent();
    },
  }),
});
