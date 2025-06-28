import { describe, test, expect } from '@jest/globals';
import feedReducer, { getFeeds, getOrders, initialState } from './feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

describe('Тестирование редьюсера feed', () => {
  describe('Запрос всех заказов', () => {
    test('После запроса заказов ожидается ответ (pending)', () => {
      const expected = feedReducer(initialState, {
        type: getFeeds.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = feedReducer(initialState, {
        type: getFeeds.rejected.type,
        error: { message: errorMessage }
      });
      const received = { ...initialState, loading: false, error: errorMessage };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился успешно', () => {
      const feeds: TOrdersData = {
        orders: [
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
        ],
        total: 82501,
        totalToday: 102
      };

      const expected = feedReducer(initialState, {
        type: getFeeds.fulfilled.type,
        payload: feeds
      });
      const received = {
        ...initialState,
        loading: false,
        orders: feeds.orders,
        total: feeds.total,
        totalToday: feeds.totalToday
      };
      expect(received).toEqual(expected);
    });
  });

  describe('Запрос заказов пользователя', () => {
    test('После запроса заказов ожидается ответ (pending)', () => {
      const expected = feedReducer(initialState, {
        type: getOrders.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = feedReducer(initialState, {
        type: getOrders.rejected.type,
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

      const expected = feedReducer(initialState, {
        type: getOrders.fulfilled.type,
        payload: orders
      });
      const received = {
        ...initialState,
        loading: false,
        orders: orders
      };
      expect(received).toEqual(expected);
    });
  });
});
