import Link from "next/link";

const Footer = (): JSX.Element => (
  <footer className="container mt-5">
    <p className="float-right">
      <a href="#">Back to top</a>
    </p>
    <p>
      © 2020 Next Level. An Initiative by Bits Please gcv ·
      <Link href="/privacy">
        <a className="m-2">Privacy</a>
      </Link>
      ·
      <Link href="/terms">
        <a className="m-2">Terms</a>
      </Link>
    </p>
  </footer>
);
export default Footer;
