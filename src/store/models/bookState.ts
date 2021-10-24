/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { random, sample, sampleSize } from 'lodash';
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
  /**
   * 配置游戏里要精读几轮，一个范围用于随机选取
   */
  detailedReadRoundConfig: [number, number];
  /**
   * 当局游戏里随机出的需要精读几轮
   */
  detailedReadRound: number;
  /**
   * 当前已经读了几轮了
   */
  currentDetailedReadRound: number;
  currentSkimThroughReadContent: ICDDAJSONWithNameAndDescription[];
  currentDetailedReadTemplate: string | undefined;
  currentDetailedReadContent: Array<IOutputWIthMetadata<IBookTextMetadata[]>>;
  /**
   * 目前游戏里可用的所有模板的目录
   */
  detailedTemplateMenu: string[];
  /**
   * 滑稽的对模板生成文本的评论
   */
  bookComments: Record<string, string>;
  /**
   * 当局精读里可用的随机抽取的几份模板的列表
   */
  currentDetailedTemplateNames: string[];
}

/**
 * 管理当前在读的书的状态
 */
export const bookState = createModel<RootModel>()({
  state: {
    skimThroughReadCountRange: [1, 2],
    skimThroughReadInterval: 4000,
    detailedReadWithScoreFrequency: 0.4,
    detailedReadWithItemFrequency: 0.2,
    detailedReadRoundConfig: [2, 5],
    detailedReadRound: 3,
    currentDetailedReadRound: 0,
    currentSkimThroughReadContent: [],
    currentDetailedReadTemplate: undefined,
    currentDetailedReadContent: [],
    detailedTemplateMenu: [],
    bookComments: {},
    currentDetailedTemplateNames: [],
  } as IBookState,
  reducers: {
    /**
     * 更新目前游戏里可用的所有模板的目录
     */
    updateDetailedTemplateMenu(state, newMenu: string[]) {
      state.detailedTemplateMenu = newMenu;
      return state;
    },
    /**
     * 刷新当局游戏里随机出的需要精读几轮
     * 顺便初始化当局游戏里已经读了几轮了
     */
    updateDetailedReadRound(state) {
      const [min, max] = state.detailedReadRoundConfig;
      state.detailedReadRound = random(min, max);
      state.currentDetailedReadRound = 0;
      return state;
    },
    /**
     * 刷新当局游戏里已经读了几轮了
     * 传 0 即为初始化
     */
    updateCurrentDetailedReadRound(state, currentDetailedReadRound: number) {
      state.currentDetailedReadRound = currentDetailedReadRound;
      return state;
    },
    /**
     * 更新当局精读里可用的随机抽取的几份模板的列表
     */
    updateCurrentDetailedTemplateNames(state, newTemplateNames: string[]) {
      state.currentDetailedTemplateNames = newTemplateNames;
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
    updateBookComments(state, newBookComments: Record<string, string>) {
      state.bookComments = newBookComments;
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
    /**
     * 加载并抽取几本精读用的书备选
     * @param count 抽几本书放在备选里
     * @param rootState
     * @returns
     */
    async loadAvailableDetailedTemplates(count: number, rootState) {
      // 获取能用的模板
      let detailedTemplateMenu = rootState.bookState.detailedTemplateMenu;
      if (detailedTemplateMenu === undefined || detailedTemplateMenu.length === 0) {
        const detailedTemplateMenuContent = await fetch('templates/menu.txt').then(async (response) => await response.text());
        detailedTemplateMenu = detailedTemplateMenuContent.split('\n');
        dispatch.bookState.updateDetailedTemplateMenu(detailedTemplateMenu);
      }
      const newDetailedTemplateNames = sampleSize(detailedTemplateMenu, count);
      if (newDetailedTemplateNames.length === 0) {
        console.error(`没有抽取到合适的模板，可能 /public/templates/menu.txt 有问题`);
        return;
      }
      dispatch.bookState.updateCurrentDetailedTemplateNames(newDetailedTemplateNames);
    },
    /**
     * 选择好模板后，开始生成精读文本
     * @param newDetailedTemplateName 要使用的模板名
     * @param rootState
     */
    async startNewDetailedRead(newDetailedTemplateName: string, rootState) {
      dispatch.bookState.clearDetailedReadingContent();
      dispatch.bookState.updateCurrentDetailedTemplateNames([]);

      const newDetailedTemplateContent = await fetch(`templates/${newDetailedTemplateName}`).then(async (response) => await response.text());
      console.log(newDetailedTemplateContent);
      const vFile = new VFile({ path: newDetailedTemplateName, value: newDetailedTemplateContent });
      console.log('vFile', vFile);
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
        console.log('resultWithRandomMetadata', resultWithRandomMetadata);
        dispatch.bookState.updateDetailedReadingContent(resultWithRandomMetadata);
      } catch (error) {
        newErrorMessage += (error as Error).message;
      }
      // newErrorMessage += reporter(vFile);
      console.warn('自动生成结束', newErrorMessage);
    },
    /**
     * 加载对书的评论到 uiState currentBookComment 里
     * @param templateName 需要加载评论的书名
     * @param rootState
     */
    async loadCurrentBookComment(templateName: string, rootState) {
      let bookComments = rootState.bookState.bookComments;
      if (Object.keys(bookComments).length === 0) {
        const newBookCommentContent = await fetch(`templates/comment.json`).then(
          async (response) => await (response.json() as Promise<Record<string, string>>),
        );
        dispatch.bookState.updateBookComments(newBookCommentContent);
        bookComments = newBookCommentContent;
      }
      dispatch.uiState.currentBookCommentSetter(bookComments[templateName]);
    },
  }),
});
