/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { random, sample } from 'lodash';
import { cddaJSONWithNameAndDescription, ICDDAJSONWithNameAndDescription } from 'cdda-chinese-text-dataset';
import { IConfiguration, templateFileToNLCSTNodes, getConfigSchemaFromTemplate, IOutputWIthMetadata, randomOutlineToArrayWithMetadataCompiler } from 'tbg';
import { createModel } from '@rematch/core';
import { VFile } from 'vfile';
import type { RootModel } from './index';

interface IBookState {
  /** 要略读几本书才进入精读，一个范围用于随机选取 */
  skimThroughReadCountRange: [number, number];
  /** 略读的新书添加间隔 ms 时间 */
  skimThroughReadInterval: number;
  currentSkimThroughReadContent: ICDDAJSONWithNameAndDescription[];
  currentDetailedReadTemplate: string | undefined;
  currentDetailedReadContent: Array<IOutputWIthMetadata<string[]>>;
  detailedTemplateMenu: string[];
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
    detailedTemplateMenu: [],
  } as IBookState,
  reducers: {
    updateDetailedTemplateMenu(state, newMenu: string[]) {
      state.detailedTemplateMenu = newMenu;
      return state;
    },
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
    updateDetailedReadingContent(state, newDetailedReadingContent: Array<IOutputWIthMetadata<string[]>>) {
      state.currentDetailedReadContent = newDetailedReadingContent;
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
      // 获取能用的模板
      let detailedTemplateMenu = rootState.bookState.detailedTemplateMenu;
      if (detailedTemplateMenu === undefined || detailedTemplateMenu.length === 0) {
        const detailedTemplateMenuContent = await fetch('/public/templates/menu.txt').then(async (response) => await response.text());
        detailedTemplateMenu = detailedTemplateMenuContent.split('\n');
        dispatch.bookState.updateDetailedTemplateMenu(detailedTemplateMenu);
      }
      const newDetailedTemplateName = sample(detailedTemplateMenu);
      if (newDetailedTemplateName === undefined || newDetailedTemplateName.length === 0) {
        console.error(`没有抽取到合适的模板，可能 /public/templates/menu.txt 有问题`);
        return;
      }
      const newDetailedTemplateContent = await fetch(`/public/templates/${newDetailedTemplateName}`).then(async (response) => await response.text());
      const vFile = new VFile({ path: newDetailedTemplateName, value: newDetailedTemplateContent });
      // 开始自动生成
      let newErrorMessage = '';
      try {
        const templateData = templateFileToNLCSTNodes(vFile);
        // TODO: 暂时没用上模板槽位
        const configFormData = {};
        if (configFormData === undefined) {
          throw new Error('模板参数不正确');
        }
        const result: Array<IOutputWIthMetadata<string[]>> = randomOutlineToArrayWithMetadataCompiler(templateData, configFormData);
        dispatch.bookState.updateDetailedReadingContent(result);
      } catch (error) {
        newErrorMessage += (error as Error).message;
      }
      // newErrorMessage += reporter(vFile);
      console.warn('自动生成结束', newErrorMessage);
    },
  }),
});
