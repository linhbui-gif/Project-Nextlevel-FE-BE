import { Spinner, Button } from "react-bootstrap";

type TProps = {
  loading: boolean;
  caption: string;
};

export const SubmitButton = ({ loading, caption }: TProps): JSX.Element => (
  <Button type="submit" disabled={loading} className="btn btn-primary">
    {caption}
    {loading && (
      <Spinner animation="border" className="ml-1" role="status" size="sm">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )}
  </Button>
);

export default SubmitButton;
