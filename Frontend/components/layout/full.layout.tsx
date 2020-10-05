import Head from "next/head";
import styles from "./layout.module.css";
import HeaderMenu from "./header.menu";
import Footer from "./footer.layout";
import { TUser } from "../../types";

type TProps = {
  children?: any;
  user?: TUser;
  requestLogout?: () => void;
};

const Layout = ({ children, user, requestLogout }: TProps): JSX.Element => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderMenu user={user} requestLogout={requestLogout} />
    <main role="main" className={styles.main}>
      <div className="container-fluid">{children}</div>
      <Footer />
    </main>
  </div>
);
export default Layout;
