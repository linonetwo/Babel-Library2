import { Models } from '@rematch/core';

import { uiState } from './uiState';
import { bookState } from './bookState';

export interface RootModel extends Models<RootModel> {
  bookState: typeof bookState;
  uiState: typeof uiState;
}

export const models: RootModel = { uiState, bookState };
