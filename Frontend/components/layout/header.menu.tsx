import Link from "next/link";
import { Dropdown, DropdownButton, Button, Nav, Navbar } from "react-bootstrap";
import { TUser } from "../../types";

const SearchForm = () =>
  null && (
    <form className="form-inline mt-2 mt-md-0">
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );

const GuestMenu = () => (
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link href="/user/signup">
        <a className="nav-link">Signup</a>
      </Link>
    </li>
    <li className="nav-item">
      <Link href="/user/login">
        <Button variant="outline-primary">Login</Button>
      </Link>
    </li>
  </ul>
);

const AdminMenu = ({ user, requestLogout }: TProps) => (
  <DropdownButton
    className="mx-2 ml-auto"
    id="dropdown-basic-button"
    title={user.email}
    variant="outline-primary"
  >
    <Link href="/admin" passHref>
      <Dropdown.Item>Go to dashboard</Dropdown.Item>
    </Link>
    <Link href="/user/profile" passHref>
      <Dropdown.Item>Profile</Dropdown.Item>
    </Link>
    <Dropdown.Item onClick={requestLogout}>Logout</Dropdown.Item>
  </DropdownButton>
);

const MemberMenu = ({ user, requestLogout }: TProps) => (
  <DropdownButton
    className="mx-2 ml-auto"
    id="dropdown-basic-button"
    title={user.email}
    variant="secondary"
  >
    <Link href="/members" passHref>
      <Dropdown.Item>Go to dashboard</Dropdown.Item>
    </Link>
    <Link href="/user/profile" passHref>
      <Dropdown.Item>Profile</Dropdown.Item>
    </Link>
    <Dropdown.Item onClick={requestLogout}>Logout</Dropdown.Item>
  </DropdownButton>
);

type TProps = {
  user?: TUser;
  requestLogout?: () => void;
};

const HeaderMenu = ({ user, requestLogout }: TProps): JSX.Element => {
  let role;
  if (!user || !user.roles) {
    role = "guest";
  } else if (user.roles.indexOf("admin") > -1) {
    role = "admin";
  } else if (user.roles.indexOf("member") > -1) {
    role = "member";
  }
  return (
    <header>
      <Navbar expand="md" variant="light" bg="light" fixed="top">
        <Link href="/" passHref>
          <Navbar.Brand className="text-primary font-weight-bold">
            Next Level
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {role === "guest" && (
            <Nav className="mr-auto">
              <Nav.Item>
                <Link href="/developers" passHref>
                  <Nav.Link>Developers</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/companies" passHref>
                  <Nav.Link>Companies</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          )}
          {role === "member" && (
            <Nav className="mr-auto">
              <Nav.Item>
                <Link href="/projects" passHref>
                  <Nav.Link>Projects</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          )}
          <SearchForm />
          {role === "admin" && (
            <AdminMenu user={user} requestLogout={requestLogout} />
          )}
          {role === "member" && (
            <MemberMenu user={user} requestLogout={requestLogout} />
          )}
          {role === "guest" && <GuestMenu />}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default HeaderMenu;
