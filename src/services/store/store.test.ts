import { test, expect } from '@jest/globals';
import store, { rootReducer } from './store';

test('rootReducer инициализируется корректно', () => {
  const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(initialState).toEqual(store.getState());
});
