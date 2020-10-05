import Link from "next/link";

const SidebarMenu = (): JSX.Element => (
  <nav
    id="sidebarMenu"
    className="col-md-3 col-lg-2 d-md-block sidebar collapse vh-100"
  >
    <div className="sidebar-sticky pt-3">
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
        <span>Articles</span>
      </h6>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link href="/admin/articles/new">
            <a className="nav-link">New draft</a>
          </Link>
          <Link href="/admin/articles">
            <a className="nav-link">Articles</a>
          </Link>
          <Link href="/admin/categories">
            <a className="nav-link disabled">Categories</a>
          </Link>
        </li>
      </ul>

      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
        <span>Projects</span>
      </h6>
      <ul className="nav flex-column mb-2">
        <Link href="/admin/projects/new">
          <a className="nav-link">New project</a>
        </Link>
        <Link href="/admin/projects">
          <a className="nav-link">Projects</a>
        </Link>
        <Link href="/admin/project/applications">
          <a className="nav-link disabled">Applications</a>
        </Link>
      </ul>

      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
        <span>Members</span>
      </h6>
      <ul className="nav flex-column mb-2">
        <Link href="/admin/members">
          <a className="nav-link disabled">View all</a>
        </Link>
      </ul>
    </div>
  </nav>
);

export default SidebarMenu;
