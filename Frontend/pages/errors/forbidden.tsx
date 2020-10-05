import Link from "next/link";
import Layout from "../../components/layout/full.layout";
import { TUser } from "../../types";

type TProps = {
  user?: TUser;
  requestLogout: () => void;
};
const ForbiddenError = ({ user, requestLogout }: TProps): JSX.Element => (
  <Layout user={user} requestLogout={requestLogout}>
    <div className="container">
      <div className="row">
        <div className="col mt-5 text-center">
          <h1>Forbidden</h1>
          <p>You are not allowed to access this content.</p>
          <a href="#" className="link" onClick={() => window.history.back()}>
            Go back
          </a>
          {!user && (
            <>
              <span> or </span>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  </Layout>
);

export default ForbiddenError;
