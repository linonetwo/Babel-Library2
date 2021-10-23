/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { random, sample } from 'lodash';
import { cddaJSONWithNameAndDescription, ICDDAJSONWithNameAndDescription } from 'cdda-chinese-text-dataset';
import { IConfiguration, templateFileToNLCSTNodes, getConfigSchemaFromTemplate, IOutputWIthMetadata, randomOutlineToArrayWithMetadataCompiler } from 'tbg';
import { createModel } from '@rematch/core';
import { VFile } from 'vfile';
import type { RootModel } from './index';

const parsedCddaJSONWithNameAndDescription = JSON.parse(cddaJSONWithNameAndDescription) as ICDDAJSONWithNameAndDescription[];

export interface IBookTextUpdateGameScoreMetadata {
  /** 对哪个计分板进行加减分 */
  score: string;
  /** 正负值，正值为加分，反正直接加到现有分上就行 */
  scoreDiff: number;
}
export interface IBookTextNewItemMetadata {
  /** 新获得的物品 ID */
  item: string;
}
/**
 * 通过阅读书的某一行获得的新东西，可能是计分，也可能是物品/认知
 */
export type IBookTextMetadata = IBookTextUpdateGameScoreMetadata | IBookTextNewItemMetadata | (IBookTextUpdateGameScoreMetadata & IBookTextNewItemMetadata);

interface IBookState {
  /** 要略读几本书才进入精读，一个范围用于随机选取 */
  skimThroughReadCountRange: [number, number];
  /** 略读的新书添加间隔 ms 时间 */
  skimThroughReadInterval: number;
  /** 精读时的计分板内容出率 */
  detailedReadWithScoreFrequency: number;
  /** 精读时的新物品出率 */
  detailedReadWithItemFrequency: number;
  currentSkimThroughReadContent: ICDDAJSONWithNameAndDescription[];
  currentDetailedReadTemplate: string | undefined;
  currentDetailedReadContent: Array<IOutputWIthMetadata<IBookTextMetadata[]>>;
  detailedTemplateMenu: string[];
}

/**
 * 管理当前在读的书的状态
 */
export const bookState = createModel<RootModel>()({
  state: {
    skimThroughReadCountRange: [10, 20],
    skimThroughReadInterval: 4000,
    detailedReadWithScoreFrequency: 0.4,
    detailedReadWithItemFrequency: 0.2,
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
    updateDetailedReadingContent(state, newDetailedReadingContent: Array<IOutputWIthMetadata<IBookTextMetadata[]>>) {
      state.currentDetailedReadContent = newDetailedReadingContent;
      return state;
    },
  },
  effects: (dispatch) => ({
    async startNewSkimThroughRead(payload, rootState) {
      dispatch.bookState.clearSkimThroughReadingContent();
      const [min, max] = rootState.bookState.skimThroughReadCountRange;
      for (let counter = 0; counter < random(min, max); counter += 1) {
        const randomBook = sample(parsedCddaJSONWithNameAndDescription);
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
        const result: Array<IOutputWIthMetadata<unknown[]>> = randomOutlineToArrayWithMetadataCompiler(templateData, configFormData);
        // 为文本带上随机的数值内容
        const scoreIDs = Object.keys(rootState.valueState.scores);
        const itemIDs = Object.keys(rootState.valueState.itemDefinitions);
        const resultWithRandomMetadata: Array<IOutputWIthMetadata<IBookTextMetadata[]>> = result.map((aResult) => {
          // 每行文本都随机抽取一下
          const randomScoreID = sample(scoreIDs);
          const randomItemID = sample(itemIDs);
          const haveScore = rootState.bookState.detailedReadWithScoreFrequency > random(0, 1, true);
          const haveItem = rootState.bookState.detailedReadWithItemFrequency > random(0, 1, true);
          let metadataItem: IBookTextMetadata | undefined;
          if (haveScore && randomScoreID !== undefined) {
            const randomScoreValue = random(0, 3);
            metadataItem = {
              ...metadataItem,
              score: randomScoreID,
              scoreDiff: randomScoreValue,
            };
          }
          if (haveItem && randomItemID !== undefined) {
            metadataItem = {
              ...metadataItem,
              item: randomItemID,
            };
          }
          return {
            ...aResult,
            metadata: metadataItem !== undefined ? [metadataItem] : undefined,
          };
        });
        dispatch.bookState.updateDetailedReadingContent(resultWithRandomMetadata);
      } catch (error) {
        newErrorMessage += (error as Error).message;
      }
      // newErrorMessage += reporter(vFile);
      console.warn('自动生成结束', newErrorMessage);
    },
  }),
});
