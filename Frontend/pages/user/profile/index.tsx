import { connect } from "react-redux";
import { AppState } from "../../../store/reducers";
import { TUser } from "../../../types";
import Layout from "../../../components/layout/full.layout";
import AuthGuard from "../../../components/common/AuthGuard";
import { requestLogoutAction } from "../../../store/actions";

type TProps = {
  user?: TUser;
  requestLogout: () => void;
};
const Profile = ({ user, requestLogout }: TProps) => {
  return (
    <AuthGuard
      roles={["member", "admin", "editor"]}
      user={user}
      requestLogout={requestLogout}
      verbose
    >
      <Layout user={user} requestLogout={requestLogout}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5">
              <h3>Menu</h3>
              <p>Profile</p>
              <p>Change Password</p>
              <p>Log out</p>
            </div>
            <div className="col-md-8 mt-5">
              <h3>Profile</h3>
              {/* <p>{`${user.firstName} ${user.lastName}`}</p>
              <p>{user.email}</p>
              <p>
                Member since:
                {moment(user.createdDate).format("DD/MM/YYYY")}
              </p> */}
              <h4>Profile picture</h4>
              <p>Select pic</p>
              <h4>CV</h4>
              <p>Select CV</p>
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
})(Profile);
