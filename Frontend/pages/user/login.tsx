import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Layout from "../../components/layout/full.layout";
import LoginForm from "../../components/forms/login.form";
import { AppState } from "../../store/reducers";
import { requestLoginAction } from "../../store/actions";
import { TUser, TUserCredetials } from "../../types";

type TProps = {
  user?: TUser;
  requestLogin: (payload: TUserCredetials) => void;
  loading: boolean;
  validation: string[];
};
const Login = ({ user, requestLogin, loading, validation }: TProps) => (
  <Layout>
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
          <h3>Login with your account</h3>
          <p className="lead mb-5">
            Become a member of Next Level and get access to free resources and
            interesting coding projects.
          </p>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <LoginForm
            user={user}
            requestLogin={requestLogin}
            loading={loading}
            validation={validation}
          />
        </Col>
      </Row>
    </Container>
  </Layout>
);

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
  loading: state.users.loading,
  validation: state.users.validation,
});

export default connect(mapStateToProps, {
  requestLogin: requestLoginAction,
})(Login);
