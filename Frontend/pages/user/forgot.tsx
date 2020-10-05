import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Layout from "../../components/layout/full.layout";
import ForgotForm from "../../components/forms/forgot.form";
import { AppState } from "../../store/reducers";
import { requestForgotAction } from "../../store/actions";
import { TForgot } from "../../types";

type TProps = {
  requestForgot: (payload: TForgot) => void;
  loading: boolean;
  validation: string[];
};
const Forgot = ({ requestForgot, loading, validation }: TProps) => (
  <Layout>
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
          <h3>Forgot password</h3>
          <p className="lead mb-5">
            We will send you an email that will allow you to reset your
            password.
          </p>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <ForgotForm
            requestForgot={requestForgot}
            loading={loading}
            validation={validation}
          />
        </Col>
      </Row>
    </Container>
  </Layout>
);

const mapStateToProps = (state: AppState) => ({
  loading: state.users.loading,
  validation: state.users.validation,
});

export default connect(mapStateToProps, {
  requestForgot: requestForgotAction,
})(Forgot);
