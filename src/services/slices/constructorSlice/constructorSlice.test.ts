import { describe, test, expect } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  TConstructorsState
} from '../constructorSlice/constructorSlice';
import { TIngredient } from '@utils-types';

const ingredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const anotherIngredient = {
  ...ingredient,
  _id: '643d69a5c3f7b9001cfa0942'
};

describe('Проверка редьюсера слайса constructor', () => {
  test('Корректная обработка экшена добавления ингредиента', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(newState.constructorItems.ingredients.length).toBe(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  test('Корректная обработка экшена удаления ингредиента', () => {
    const startState = constructorReducer(
      initialState,
      addIngredient(ingredient)
    );
    const removedId = startState.constructorItems.ingredients[0].id;
    const newState = constructorReducer(
      startState,
      removeIngredient(removedId)
    );
    expect(newState.constructorItems.ingredients.length).toBe(0);
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  describe('Обработка экшена изменения порядка ингредиентов в начинке', () => {
    const startState: TConstructorsState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...ingredient, id: '1' },
          { ...anotherIngredient, id: '2' }
        ]
      }
    };
    test('Перемещение ингредиента вверх работает корректно', () => {
      const newState = constructorReducer(startState, moveIngredientUp(1));
      expect(newState.constructorItems.ingredients[0].id).toBe('2');
      expect(newState.constructorItems.ingredients[1].id).toBe('1');
    });

    test('Перемещение ингредиента вниз работает корректно', () => {
      const newState = constructorReducer(startState, moveIngredientDown(0));
      expect(newState.constructorItems.ingredients[0].id).toBe('2');
      expect(newState.constructorItems.ingredients[1].id).toBe('1');
    });
  });
});
