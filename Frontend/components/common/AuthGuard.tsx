import { NextPageContext } from "next";
import { TUser, TUserRole } from "../../types";
import ForbiddenError from "../../pages/errors/forbidden";

type TProps = {
  user?: TUser;
  children?: any;
  roles?: TUserRole[];
  requestLogout?: () => void;
  verbose?: boolean;
};

const findCommonElements = (arr: TUserRole[], arr2: TUserRole[]): boolean => {
  if (!arr2 || !arr2.length) return true;
  return arr && arr.length && arr.some((item) => arr2.includes(item));
};

const AuthGuard = ({
  user,
  roles,
  children,
  requestLogout,
  verbose,
}: TProps): JSX.Element => {
  const allowed: boolean = findCommonElements(user && user.roles, roles);
  let output: JSX.Element = null;
  if (allowed) {
    output = children;
  } else if (verbose) {
    output = <ForbiddenError user={user} requestLogout={requestLogout} />;
  }
  return output;
};

AuthGuard.getInitialProps = async (ctx: NextPageContext): Promise<TProps> => {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: "/login" });
    res.end();
  }
  return {};
};

export default AuthGuard;
