import { connect } from "react-redux";
import Layout from "../../components/layout/admin.layout";
import { AppState } from "../../store/reducers";
import AuthGuard from "../../components/common/AuthGuard";
import { TUser } from "../../types";
import { requestLogoutAction } from "../../store/actions";

type TProps = {
  user?: TUser;
  requestLogout: () => void;
};
const Admin = ({ user, requestLogout }: TProps): JSX.Element => {
  return (
    <AuthGuard
      user={user}
      roles={["admin"]}
      requestLogout={requestLogout}
      verbose
    >
      <Layout user={user} requestLogout={requestLogout}>
        <p>Admin section</p>
      </Layout>
    </AuthGuard>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, {
  requestLogout: requestLogoutAction,
})(Admin);
