import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Context
import NotificationProvider from 'core/store/contexts/Notification';
import AntDesignProvider from 'core/store/contexts/AntDesign';

// Custom Types
interface ProvidersProps {
  children?: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = (props) => {
  // Props
  const { children } = props;

  // Render
  return (
    <BrowserRouter>
      <AntDesignProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </AntDesignProvider>
    </BrowserRouter>
  );
};

export default Providers;
