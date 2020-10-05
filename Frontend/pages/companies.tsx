import Head from "next/head";
import { connect } from "react-redux";
import Layout from "../components/layout/home.layout";
import { AppState } from "../store/reducers";
import { TUser } from "../types";
import { requestLogoutAction } from "../store/actions";
import Jumbo from "../components/companies/jumbo";

type TProps = {
  user?: TUser;
  requestLogout?: () => void;
};
const Companies = ({ user, requestLogout }: TProps) => (
  <div>
    <Head>
      <title>Next Level - Companies</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout user={user} requestLogout={requestLogout}>
      <Jumbo />
      <div className="container">
        <h1 className="title">Next Level Developers</h1>
        <p className="description">High skilled remote react developers</p>

        <h2>Why Next Level?</h2>
        <p>
          Next Level is a javascript competence center in Vietnam, focussing on
          outsourcing react developers.
        </p>

        <h2>Services</h2>
        <div className="row">
          <div className="col-md-4">
            <h2>Outsourcing</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.
            </p>
            <p>
              <a className="btn btn-secondary" href="#" role="button">
                View details »
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Talent</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.
            </p>
            <p>
              <a className="btn btn-secondary" href="#" role="button">
                View details »
              </a>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Vestibulum id ligula porta felis euismod
              semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
              condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
            <p>
              <a className="btn btn-secondary" href="#" role="button">
                View details »
              </a>
            </p>
          </div>
        </div>

        <h2 className="mt-5 mb-3">Partners</h2>
        <div className="row">
          <div className="col-md-3">
            <img
              className="d-block"
              src="https://place-hold.it/80x80?bg=373940"
              alt="Partner 1"
            />
          </div>
          <div className="col-md-3">
            <img
              className="d-block"
              src="https://place-hold.it/80x80?bg=373940"
              alt="Partner 2"
            />
          </div>
          <div className="col-md-3">
            <img
              className="d-block"
              src="https://place-hold.it/80x80?bg=373940"
              alt="Partner 3"
            />
          </div>
          <div className="col-md-3">
            <img
              className="d-block"
              src="https://place-hold.it/80x80?bg=373940"
              alt="Partner 4"
            />
          </div>
        </div>
      </div>
    </Layout>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
})(Companies);
