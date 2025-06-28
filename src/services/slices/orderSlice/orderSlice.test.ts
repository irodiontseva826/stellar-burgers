import { describe, test, expect } from '@jest/globals';
import orderReducer, { getOrderByNumber, initialState } from './orderSlice';
import { TOrder } from '@utils-types';

describe('Тестирование редьюсера order', () => {
  test('После запроса заказа ожидается ответ (pending)', () => {
    const expected = orderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    const received = { ...initialState, loading: true };
    expect(received).toEqual(expected);
  });

  test('Запрос завершился с ошибкой', () => {
    const errorMessage = 'Ошибка при загрузке данных';
    const expected = orderReducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    });
    const received = { ...initialState, loading: false, error: errorMessage };
    expect(received).toEqual(expected);
  });

  test('Запрос завершился успешно', () => {
    const orders: TOrder[] = [
      {
        _id: '685f210c5a54df001b6da1ce',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Экзо-плантаго space флюоресцентный антарианский бургер',
        createdAt: '2025-06-27T22:54:04.829Z',
        updatedAt: '2025-06-27T22:54:05.751Z',
        number: 82875
      }
    ];

    const expected = orderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders }
    });
    const received = {
      ...initialState,
      loading: false,
      order: orders[0]
    };
    expect(received).toEqual(expected);
  });
});
