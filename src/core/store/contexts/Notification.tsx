import { createContext, useContext } from 'react';
import { notification } from 'antd';

// Custom Types
import type { NotificationArgsProps } from 'antd';

interface NotificationContextProps {
  setNotification: (
    args: NotificationArgsProps & { type: NotificationType }
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  setNotification: () => {},
});

interface NotificationProps {
  children?: React.ReactNode;
}

export const useNotificationContext = () => useContext(NotificationContext);

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const NotificationProvider: React.FC<NotificationProps> = (props) => {
  // Props
  const { children } = props;
  const [api, contextHolder] = notification.useNotification();

  const handleOpenNotification = (
    args: NotificationArgsProps & { type: NotificationType }
  ) => {
    api[args?.type]({
      placement: 'topLeft',
      ...args,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ setNotification: handleOpenNotification }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
