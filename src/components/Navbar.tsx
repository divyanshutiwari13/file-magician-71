import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const nav = (p: string) => (pathname === p ? "nav-link active" : "nav-link");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-file-earmark-pdf-fill me-2"></i>ConvertPro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link className={nav("/")} to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Tools
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/pdf-to-word"><i className="bi bi-filetype-pdf me-2"></i>PDF to Word</Link></li>
                <li><Link className="dropdown-item" to="/word-to-pdf"><i className="bi bi-filetype-docx me-2"></i>Word to PDF</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/compress-image"><i className="bi bi-image me-2"></i>Compress Image</Link></li>
                <li><Link className="dropdown-item" to="/resize-image"><i className="bi bi-aspect-ratio me-2"></i>Resize Image</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`${nav("/login")} btn btn-outline-primary btn-sm ms-lg-2 px-3`} to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-gradient btn-sm ms-lg-1 px-3 text-white" to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
