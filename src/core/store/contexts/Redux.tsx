import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'core/store';

interface ReduxProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProps> = (props) => {
  // Props
  const { children } = props;

  // Render
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
