import { ReactNode } from 'react';

import styles from './AppContainer.module.css';

interface IProps {
  children: ReactNode;
}

export default function AppContainer(props: IProps) {
  return <div className={styles.wrapper}>{props.children}</div>;
}
