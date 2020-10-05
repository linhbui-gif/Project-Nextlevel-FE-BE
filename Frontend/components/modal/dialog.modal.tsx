import { Modal, Button } from "react-bootstrap";

type TProps = {
  show: boolean;
  title: string;
  body: string | JSX.Element;
  confirmText?: string;
  cancelText?: string;
  onSubmit: () => void;
  onCancel: () => void;
};
const DialogModal = ({
  title,
  body,
  confirmText = "Ok",
  cancelText = "Cancel",
  onSubmit,
  onCancel,
  show,
}: TProps): JSX.Element => (
  <Modal show={show} onHide={onCancel}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="link" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button variant="primary" onClick={onSubmit}>
        {confirmText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DialogModal;
