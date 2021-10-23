import { Models } from '@rematch/core';

import { uiState } from './uiState';
import { bookState } from './bookState';
import { valueState } from './valueState';

export interface RootModel extends Models<RootModel> {
  bookState: typeof bookState;
  uiState: typeof uiState;
  valueState: typeof valueState;
}

export const models: RootModel = { uiState, bookState, valueState };
