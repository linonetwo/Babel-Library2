/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { cloneDeep } from 'lodash';
import { createModel } from '@rematch/core';
import type { IBookTextUpdateGameScoreMetadata } from './bookState';
import type { RootModel } from './index';

export enum ItemEffect {
  增加,
}
export interface IItem {
  /**
   * 其实也是 name，索引和展示用
   */
  id: string;
  /**
   * 物品描述文案
   */
  description: string;
  /**
   * 物品效果，描述了 value 字段的解释方法
   */
  effect: ItemEffect;
  /**
   * 一个数值，涵义根据 effect 不同而不同
   */
  value: number;
}
export type IItemDefinition = Record<string, IItem | undefined>;
interface IValueState {
  /**
   * 当前的计分板，可以分为多个维度，例如「资源，威胁，道德」，各自有自己的得分
   * 同时这个字段的 key 也作为 score 的 schema 使用，可以 Object.keys 后用于得知有哪几个 score 维度
   */
  scores: Record<string, number | undefined>;
  /**
   * 当前持有的物品 ID 列表
   */
  inventory: string[];
  /**
   * 当前局激活的物品 ID 列表
   */
  activatedInventory: string[];
  /**
   * 加载的策划填的物品定义表
   */
  itemDefinitions: IItemDefinition;
}

/**
 * 管理当前在读的书的状态
 */
export const valueState = createModel<RootModel>()({
  state: {
    scores: {},
    inventory: [],
    activatedInventory: [],
    itemDefinitions: {},
  } as IValueState,
  reducers: {
    /**
     * 更新计分板中的一个维度
     * @param type keyof typeof scores，例如 `"威胁"`
     * @param newValue 新的值，将直接设进去。需要在 react 侧在旧值上累加后设过来
     */
    updateScore(state, type: string, newValue: number) {
      state.scores[type] = newValue;
      return state;
    },
    clearScore(state) {
      state.scores = {};
      return state;
    },
    /**
     * 玩家新获得道具时，调用这个放入物品栏
     * @param 玩家新获得的物品的 ID
     * @returns
     */
    insertInventory(state, newItemID: string) {
      state.inventory.push(newItemID);
      return state;
    },
    clearInventory(state) {
      state.inventory = [];
      return state;
    },
    /**
     * 设置哪些物品是启用了的。此方法也可以用于清空启用的物品列表。
     * @param newActivatedInventory 物品 ID 列表，或空列表
     * @returns
     */
    setActivatedInventory(state, newActivatedInventory: string[]) {
      state.activatedInventory = newActivatedInventory;
      return state;
    },
    updateItemDefinitions(state, newItemDefinitions: IItemDefinition) {
      state.itemDefinitions = newItemDefinitions;
      return state;
    },
  },
  effects: (dispatch) => ({
    async startNewSkimThroughRead(payload, rootState) {},
    async loadItemDefinitions(payload, rootState) {
      dispatch.valueState.updateItemDefinitions({});
    },
    /**
     * 检测玩家物品栏，看看是不是有影响数值计算的物品在，返回计算得到的真实数值
     * @param payload 本次参与计算的数值和类型
     */
    checkItemAffectValues(payload: IBookTextUpdateGameScoreMetadata, rootState) {
      const realValue = cloneDeep(payload);
      rootState.valueState.activatedInventory.forEach((item) => {
        const itemDefinition = rootState.valueState.itemDefinitions[item];
        if (itemDefinition !== undefined) {
          switch (itemDefinition.effect) {
            case ItemEffect.增加:
              realValue.scoreDiff += itemDefinition.value;
              break;

            default:
              break;
          }
        }
      });

      return realValue;
    },
  }),
});
