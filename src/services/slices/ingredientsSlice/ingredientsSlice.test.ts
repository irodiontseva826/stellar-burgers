import { describe, test, expect } from '@jest/globals';
import { TIngredient } from '@utils-types';
import ingredientsReducer, {
  getIngredients,
  initialState
} from './ingredientsSlice';

describe('Тестирование редьюсера ingredients', () => {
  test('После запроса ингредиентов ожидается ответ (pending)', () => {
    const expected = ingredientsReducer(initialState, {
      type: getIngredients.pending.type
    });
    const received = { ...initialState, loading: true };
    expect(received).toEqual(expected);
  });

  test('Запрос завершился с ошибкой', () => {
    const errorMessage = 'Ошибка при загрузке данных';
    const expected = ingredientsReducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    });
    const received = { ...initialState, loading: false, error: errorMessage };
    expect(received).toEqual(expected);
  });

  test('Запрос завершился успешно', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];
    const expected = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    });
    const received = {
      ...initialState,
      loading: false,
      ingredients: ingredients
    };
    expect(received).toEqual(expected);
  });
});
