import { createContext, useContext } from 'react';
import { notification } from 'antd';

// Custom Types
import type { NotificationArgsProps } from 'antd';

interface NotificationContextProps {
  onSetNotification: (
    open: NotificationType,
    args: NotificationArgsProps
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  onSetNotification: () => {},
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
    type: NotificationType,
    payload: NotificationArgsProps
  ) => {
    api[type]({
      placement: 'topLeft',
      ...payload,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ onSetNotification: handleOpenNotification }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
