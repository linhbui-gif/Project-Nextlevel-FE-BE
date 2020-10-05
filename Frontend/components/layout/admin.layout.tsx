import Head from "next/head";
import HeaderMenu from "./header.menu";
import { TUser } from "../../types";
import SidebarMenu from "./sidebar.menu";

type TProps = {
  children?: any;
  user?: TUser;
  requestLogout: () => void;
};

function Layout({ children, user, requestLogout }: TProps): JSX.Element {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu user={user} requestLogout={requestLogout} />
      <div className="container-fluid">
        <div className="row">
          <SidebarMenu />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className="chartjs-size-monitor-expand-inner" />
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className="chartjs-size-monitor-shrink-inner" />
              </div>
            </div>

            <div className="mt-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
