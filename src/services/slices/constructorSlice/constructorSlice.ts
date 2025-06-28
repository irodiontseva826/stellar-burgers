import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const submitOrder = createAsyncThunk('order/submit', (data: string[]) =>
  orderBurgerApi(data)
);

export type TConstructorsState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TConstructorsState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const ingredients = state.constructorItems.ingredients;
      [ingredients[action.payload - 1], ingredients[action.payload]] = [
        ingredients[action.payload],
        ingredients[action.payload - 1]
      ];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const ingredients = state.constructorItems.ingredients;
      [ingredients[action.payload], ingredients[action.payload + 1]] = [
        ingredients[action.payload + 1],
        ingredients[action.payload]
      ];
    },
    clearOrder: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getConstructorState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        (state.orderRequest = true), (state.error = null);
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.error = null;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearOrder
} = constructorSlice.actions;
export const { getConstructorState } = constructorSlice.selectors;
export default constructorSlice.reducer;
