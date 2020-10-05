import { Spinner } from "react-bootstrap";

export const Loader = (): JSX.Element => (
  <div
    className="d-flex justify-content-center align-items-center w-100 h-75"
    style={{ minHeight: "300px" }}
  >
    <Spinner className="" animation="grow" variant="info" />
  </div>
);

export default Loader;
