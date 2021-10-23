/* eslint-disable typescript-sort-keys/interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createModel } from '@rematch/core';
import type { RootModel } from './index';

export enum ItemEffect {}
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
  }),
});
