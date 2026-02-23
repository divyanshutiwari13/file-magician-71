import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-4">
          <h5 className="text-white mb-3">
            <i className="bi bi-file-earmark-pdf-fill me-2"></i>ConvertPro
          </h5>
          <p className="small">Free online tools to convert PDFs, compress and resize images. Fast, easy, and secure.</p>
        </div>
        <div className="col-md-2">
          <h6 className="text-white mb-3">Links</h6>
          <ul className="list-unstyled small">
            <li className="mb-2"><Link to="/">Home</Link></li>
            <li className="mb-2"><Link to="/pdf-to-word">PDF to Word</Link></li>
            <li className="mb-2"><Link to="/word-to-pdf">Word to PDF</Link></li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="text-white mb-3">Tools</h6>
          <ul className="list-unstyled small">
            <li className="mb-2"><Link to="/compress-image">Compress Image</Link></li>
            <li className="mb-2"><Link to="/resize-image">Resize Image</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="text-white mb-3">Legal</h6>
          <ul className="list-unstyled small">
            <li className="mb-2"><a href="#">About</a></li>
            <li className="mb-2"><a href="#">Contact</a></li>
            <li className="mb-2"><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-secondary mt-4" />
      <p className="text-center small mb-0">&copy; {new Date().getFullYear()} ConvertPro. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
