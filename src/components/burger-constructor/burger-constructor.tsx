import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  clearOrder,
  getConstructorState,
  submitOrder
} from '../../services/slices/constructorSlice/constructorSlice';
import { getUserState } from '../../services/slices/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorState).constructorItems;
  const orderRequest = useSelector(getConstructorState).orderRequest;
  const orderModalData = useSelector(getConstructorState).orderModalData;
  const user = useSelector(getUserState).user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const bunId = constructorItems.bun._id;
    const ingredientsIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );

    dispatch(submitOrder([bunId, ...ingredientsIds, bunId]));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
