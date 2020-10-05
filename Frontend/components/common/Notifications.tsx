import { useState } from "react";
import Toast from "react-bootstrap/Toast";

type TProps = {
  notifications: any[];
};

export const Notifications = ({ notifications }: TProps): JSX.Element => (
  <div className="notifications-container">
    {notifications &&
      notifications.map((n) => <Notification key={n.id} message={n.message} />)}
  </div>
);

type NotificationProps = {
  message: string;
};

const Notification = ({ message }: NotificationProps): JSX.Element => {
  const [show, setShow] = useState(true);
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        minHeight: "200px",
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999999999,
      }}
    >
      <div>
        <Toast show={show} delay={3000} onClose={() => setShow(false)} autohide>
          <Toast.Header>Next Level</Toast.Header>
          {message && message === "OK" && <Toast.Body>Sucessed</Toast.Body>}
          {!message && <Toast.Body>{message}</Toast.Body>}
        </Toast>
      </div>
    </div>
  );
};
export default Notifications;
