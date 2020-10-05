import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/full.layout";
import ResetForm from "../../../components/forms/reset.form";
import { AppState } from "../../../store/reducers";
import { requestResetAction } from "../../../store/actions";
import { TReset } from "../../../types";

type TProps = {
  requestReset: (payload: TReset) => void;
  loading: boolean;
  validation: string[];
};
const Reset = ({ requestReset, loading, validation }: TProps) => {
  const router = useRouter();
  const { code } = router.query;
  const resetAction = ({ password }) =>
    requestReset({ code: code as string, password });
  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
            <h3>Reset password</h3>
            <p className="lead mb-5">
              Choose a new password. You will be automatically logged in
              afterwards.
            </p>
          </Col>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <ResetForm
              requestReset={resetAction}
              loading={loading}
              validation={validation}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state: AppState) => ({
  loading: state.users.loading,
  validation: state.users.validation,
});

export default connect(mapStateToProps, {
  requestReset: requestResetAction,
})(Reset);
