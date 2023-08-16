import types from './types';

export const apiFinish = response => ({
  type: types.API_CALL_FINISH,
  payload: {data: response.fruits, categories: response.uniqueCategories},
});

export const apiStart = () => ({
  type: types.API_CALL_START,
});
