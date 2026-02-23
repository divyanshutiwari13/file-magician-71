import { Link } from "react-router-dom";

const tools = [
  { title: "PDF to Word", desc: "Convert your PDF files to editable Word documents instantly.", icon: "bi-filetype-pdf", to: "/pdf-to-word", color: "#dc3545" },
  { title: "Word to PDF", desc: "Transform Word documents into professional PDF files.", icon: "bi-filetype-docx", to: "/word-to-pdf", color: "#0d6efd" },
  { title: "Compress Image", desc: "Reduce image file size without losing quality.", icon: "bi-image", to: "/compress-image", color: "#198754" },
  { title: "Resize Image", desc: "Change image dimensions to fit your needs perfectly.", icon: "bi-aspect-ratio", to: "/resize-image", color: "#6f42c1" },
];

const Home = () => (
  <main>
    {/* Hero */}
    <section className="hero-section text-center">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">Free Online PDF &amp; Image Converter Tool</h1>
        <p className="lead mb-4 opacity-75">
          Convert PDF to Word, Word to PDF, Compress &amp; Resize Images Easily
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Link to="/pdf-to-word" className="btn btn-light btn-lg px-4 fw-semibold">
            <i className="bi bi-filetype-pdf me-2"></i>PDF to Word
          </Link>
          <Link to="/word-to-pdf" className="btn btn-outline-light btn-lg px-4 fw-semibold">
            <i className="bi bi-filetype-docx me-2"></i>Word to PDF
          </Link>
          <Link to="/compress-image" className="btn btn-light btn-lg px-4 fw-semibold">
            <i className="bi bi-image me-2"></i>Compress Image
          </Link>
          <Link to="/resize-image" className="btn btn-outline-light btn-lg px-4 fw-semibold">
            <i className="bi bi-aspect-ratio me-2"></i>Resize Image
          </Link>
        </div>
      </div>
    </section>

    {/* Tools Grid */}
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-2">Our Tools</h2>
      <p className="text-center text-muted mb-5">Choose a tool to get started</p>
      <div className="row g-4">
        {tools.map((t) => (
          <div className="col-sm-6 col-lg-3" key={t.to}>
            <Link to={t.to} className="text-decoration-none">
              <div className="card tool-card h-100 text-center">
                <div className="card-body">
                  <div className="icon-circle" style={{ background: t.color }}>
                    <i className={`bi ${t.icon}`}></i>
                  </div>
                  <h5 className="card-title fw-bold">{t.title}</h5>
                  <p className="card-text text-muted small">{t.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>

    {/* Features */}
    <section className="bg-white py-5">
      <div className="container">
        <div className="row g-4 text-center">
          {[
            { icon: "bi-lightning-charge-fill", title: "Lightning Fast", desc: "Convert files in seconds" },
            { icon: "bi-shield-lock-fill", title: "Secure & Private", desc: "Files are processed locally" },
            { icon: "bi-phone-fill", title: "Works Everywhere", desc: "Desktop, tablet, and mobile" },
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <i className={`bi ${f.icon} text-primary display-5 mb-3`}></i>
              <h5 className="fw-bold">{f.title}</h5>
              <p className="text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Home;
