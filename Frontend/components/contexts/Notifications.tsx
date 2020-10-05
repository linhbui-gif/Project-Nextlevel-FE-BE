import { createContext, useReducer, useContext } from "react";
import { createPortal } from "react-dom";
import { Notifications } from "../common";
import notificationReducer from "../../store/reducers/notification.reducers";

export const NotificationContext = createContext(null);

const initialState = [];

export const NotificationProvider = ({
  children,
}: {
  children: any;
}): JSX.Element => {
  const [notifications, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );
  const notificationData = { notifications, notificationDispatch };
  return (
    <NotificationContext.Provider value={notificationData}>
      {children}

      {createPortal(
        <Notifications notifications={notifications} />,
        document.body
      )}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): any => {
  return useContext(NotificationContext);
};
