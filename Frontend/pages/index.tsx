import Head from "next/head";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Layout from "../components/layout/home.layout";
import { AppState } from "../store/reducers";
import { requestLogoutAction } from "../store/actions/index";
import { TUser } from "../types";
import Featurettes from "../components/home/featurettes";
import Triptych from "../components/home/tryptich";
import AuthGuard from "../components/common/AuthGuard";
import Slider from "../components/home/slider";

const TestComponent = () => (
  <div className="row">
    <div className="col-6">
      <Button variant="primary">Primary</Button>

      <br />
      <Button variant="secondary">Secondary</Button>

      <br />
      <Button variant="success">Success</Button>

      <br />
      <Button variant="warning">Warning</Button>

      <br />
      <Button variant="danger">Danger</Button>

      <br />
      <Button variant="info">Info</Button>

      <br />
      <Button variant="light">Light</Button>

      <br />
      <Button variant="dark">Dark</Button>

      <br />
      <Button variant="link">Link</Button>

      <br />
    </div>
    <div className="col-6">
      <p className="text-primary">.text-primary</p>
      <p className="text-secondary">.text-secondary</p>
      <p className="text-success">.text-success</p>
      <p className="text-danger">.text-danger</p>
      <p className="text-warning">.text-warning</p>
      <p className="text-info">.text-info</p>
      <p className="text-light bg-dark">.text-light</p>
      <p className="text-dark">.text-dark</p>
      <p className="text-muted">.text-muted</p>
      <p className="text-white bg-dark">.text-white</p>
    </div>
  </div>
);

type TProps = {
  user?: TUser;
  requestLogout: () => void;
};
const Home = ({ user, requestLogout }: TProps) => (
  <div>
    <Head>
      <title>Next Level</title>
    </Head>
    <AuthGuard user={user} verbose>
      <Layout user={user} requestLogout={requestLogout}>
        <Slider />
        <div className="container marketing">
          {/* <TestComponent /> */}
          <Triptych />
        </div>
        <div className="container-fluid bg-dark text-light">
          <div className="container">
            <div className="p-5 m-5 text-center">
              <h3>Did you know this website is made by juniors?</h3>
              <p className="lead">
                Learn our structured project approach to gain the most out of
                your learning efforts.
              </p>
            </div>
          </div>
        </div>
        <div className="container marketing">
          <Featurettes />
        </div>
      </Layout>
    </AuthGuard>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
})(Home);
