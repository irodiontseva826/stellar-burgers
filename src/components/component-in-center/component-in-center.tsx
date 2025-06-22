import { FC, memo } from 'react';
import { TComponentInCenterProps } from './type';
import { ComponentInCenterUI } from '../ui/component-in-center';

export const ComponentInCenter: FC<TComponentInCenterProps> = memo(
  ({ title, children }) => (
    <ComponentInCenterUI title={title} children={children} />
  )
);
