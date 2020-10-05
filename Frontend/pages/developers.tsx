import Head from "next/head";
import { connect } from "react-redux";
import { AppState } from "../store/reducers";
import { requestLogoutAction } from "../store/actions";
import { TUser } from "../types";
import Layout from "../components/layout/home.layout";
import Slider from "../components/developers/slider";

type TProps = {
  user?: TUser;
  requestLogout?: () => void;
};
const Developers = ({ user, requestLogout }: TProps) => (
  <div>
    <Head>
      <title>Next Level - Developers</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout user={user} requestLogout={requestLogout}>
      <Slider />
      <div className="container">
        <h1 className="title">Next Level Developers</h1>
        <p className="description">
          A flying start for
          <code> your-international-IT-career.js</code>
        </p>
        <h2>Bootcamp</h2>
        <h2>Jobs</h2>
      </div>
    </Layout>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
})(Developers);
