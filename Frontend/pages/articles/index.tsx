import { connect } from "react-redux";
import Layout from "../../components/layout/full.layout";
import { TUser } from "../../types";
import AuthGuard from "../../components/common/AuthGuard";
import { requestLogoutAction } from "../../store/actions";
import { AppState } from "../../store/reducers";

type TProps = {
  children?: any;
  user?: TUser;
  requestLogout: () => void;
};

const Jumbo = () => (
  <section className="jumbotron text-center">
    <div className="container">
      <h1>Posts</h1>
      <p className="lead text-muted">
        Something short and leading about the collection below—its contents, the
        creator, etc. Make it short and sweet, but not too short so folks don’t
        simply skip over it entirely.
      </p>
      <p>
        <a href="#" className="btn btn-primary m-2">
          Main call to action
        </a>
        <a href="#" className="btn btn-secondary m-2">
          Secondary action
        </a>
      </p>
    </div>
  </section>
);

const Article = () => (
  <div className="card mb-4 shadow-sm">
    <svg
      className="bd-placeholder-img card-img-top"
      width="100%"
      height="225"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="Placeholder: Thumbnail"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#55595c" />
      <text x="43%" y="50%" fill="#eceeef" dy=".3em">
        Thumbnail
      </text>
    </svg>
    <div className="card-body">
      <p className="card-text">
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group">
          <button type="button" className="btn btn-sm btn-outline-secondary">
            View
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary">
            Edit
          </button>
        </div>
        <small className="text-muted">9 mins</small>
      </div>
    </div>
  </div>
);

const Articles = ({ user, requestLogout }: TProps): JSX.Element => {
  return (
    <AuthGuard
      roles={["member", "editor", "admin"]}
      user={user}
      requestLogout={requestLogout}
      verbose
    >
      <Layout user={user} requestLogout={requestLogout}>
        <Jumbo />
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Article />
              </div>
              <div className="col-md-6">
                <Article />
              </div>

              <div className="col-md-4">
                <Article />
              </div>
              <div className="col-md-4">
                <Article />
              </div>
              <div className="col-md-4">
                <Article />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
})(Articles);
