import * as React from 'react';
import { ConfigProvider } from 'antd';

// Custom Types
interface AntDesignProps {
  children?: React.ReactNode;
}

const AntDesignProvider: React.FC<AntDesignProps> = (props) => {
  // Props
  const { children } = props;

  // Render
  return (
    <ConfigProvider
      theme={{
        token: {
          colorError: 'rgb(255,2,2)',
          colorSuccess: 'rgb(44,150,44)',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntDesignProvider;
