import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import React, {
  FunctionComponent,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { UpBtn } from '../components';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
    useState<boolean>(false);

  const mainRef = useRef<HTMLDivElement>(null);

  const onSkiplinkKeydown = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      mainRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        className={cn(styles.skiplink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        tabIndex={1}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={onSkiplinkKeydown}
      >
        Перейти к основному содержимому
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div
        className={styles.main}
        ref={mainRef}
        tabIndex={isSkipLinkDisplayed ? 0 : -1}
      >
        {children}
      </div>
      <Footer className={styles.footer} />
      <UpBtn />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
