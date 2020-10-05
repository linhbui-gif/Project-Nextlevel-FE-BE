import Head from "next/head";
import styles from "./layout.module.css";
import HeaderMenu from "./header.menu";
import Footer from "./footer.layout";
import { TUser } from "../../types";

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
      <main role="main" className={styles.main}>
        <div>{children}</div>

        <Footer />
      </main>
    </div>
  );
}

export default Layout;
