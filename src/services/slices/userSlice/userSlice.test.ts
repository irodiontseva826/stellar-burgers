import { describe, test, expect } from '@jest/globals';
import userReducer, {
  initialState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser
} from './userSlice';
import { getCookie } from '../../../utils/cookie';

describe('Тестирование редьюсера user', () => {
  const userData = {
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken',
    user: {
      email: 'email@yandex.ru',
      name: 'Иван'
    }
  };

  describe('Регистрация пользователя', () => {
    test('После запроса ожидается ответ (pending)', () => {
      const expected = userReducer(initialState, {
        type: registerUser.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = userReducer(initialState, {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      });
      const received = { ...initialState, loading: false, error: errorMessage };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился успешно', () => {
      const expected = userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: userData
      });
      const received = {
        ...initialState,
        loading: false,
        user: userData.user
      };
      expect(received).toEqual(expected);
      expect(localStorage.getItem('refreshToken')).toBe('mockRefreshToken');
      expect(getCookie('accessToken')).toBe('mockAccessToken');
    });
  });
  describe('Вход пользователя', () => {
    test('После запроса ожидается ответ (pending)', () => {
      const expected = userReducer(initialState, {
        type: loginUser.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = userReducer(initialState, {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      });
      const received = { ...initialState, loading: false, error: errorMessage };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился успешно', () => {
      const expected = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: userData
      });
      const received = {
        ...initialState,
        loading: false,
        user: userData.user
      };
      expect(received).toEqual(expected);
      expect(localStorage.getItem('refreshToken')).toBe('mockRefreshToken');
      expect(getCookie('accessToken')).toBe('mockAccessToken');
    });
  });
  describe('Получение данных пользователя', () => {
    test('После запроса ожидается ответ (pending)', () => {
      const expected = userReducer(initialState, {
        type: getUser.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = userReducer(initialState, {
        type: getUser.rejected.type,
        error: { message: errorMessage }
      });
      const received = { ...initialState, loading: false, error: errorMessage };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился успешно', () => {
      const expected = userReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: userData
      });
      const received = {
        ...initialState,
        loading: false,
        user: userData.user
      };
      expect(received).toEqual(expected);
    });
  });
  describe('Обновление данных пользователя', () => {
    test('После запроса ожидается ответ (pending)', () => {
      const expected = userReducer(initialState, {
        type: updateUser.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = userReducer(initialState, {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const received = { ...initialState, loading: false, error: errorMessage };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился успешно', () => {
      const expected = userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: userData
      });
      const received = {
        ...initialState,
        loading: false,
        user: userData.user
      };
      expect(received).toEqual(expected);
    });
  });
  describe('Выход пользователя', () => {
    test('После запроса ожидается ответ (pending)', () => {
      const expected = userReducer(initialState, {
        type: logoutUser.pending.type
      });
      const received = { ...initialState, loading: true };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился с ошибкой', () => {
      const errorMessage = 'Ошибка при загрузке данных';
      const expected = userReducer(initialState, {
        type: logoutUser.rejected.type,
        error: { message: errorMessage }
      });
      const received = { ...initialState, loading: false, error: errorMessage };
      expect(received).toEqual(expected);
    });

    test('Запрос завершился успешно', () => {
      const expected = userReducer(initialState, {
        type: logoutUser.fulfilled.type
      });
      const received = {
        ...initialState,
        loading: false,
        user: null
      };
      expect(received).toEqual(expected);
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(getCookie('accessToken')).toBeUndefined();
    });
  });
});
