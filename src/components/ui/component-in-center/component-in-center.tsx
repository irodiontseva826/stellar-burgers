import { FC, memo } from 'react';
import { ComponentInCenterUIProps } from './type';
import styles from './component-in-center.module.css';

export const ComponentInCenterUI: FC<ComponentInCenterUIProps> = memo(
  ({ title, children }) => (
    <>
      <div className={styles.center}>
        <div className={styles.header}>
          <h3 className={`text text_type_main-large`}>{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </>
  )
);
