import { useState, useRef, DragEvent } from "react";

interface Props {
  title: string;
  subtitle: string;
  accept: string;
  icon: string;
  color: string;
}

const FileConverter = ({ title, subtitle, accept, icon, color }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setProgress(0);
    setDone(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const convert = () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setDone(false);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => {
          setConverting(false);
          setDone(true);
        }, 400);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 300);
  };

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <i className={`bi ${icon} display-5 mb-2`}></i>
          <h2 className="fw-bold">{title}</h2>
          <p className="opacity-75 mb-0">{subtitle}</p>
        </div>
      </div>
      <div className="container py-4" style={{ maxWidth: 640 }}>
        <div className="card tool-card">
          <div className="card-body p-4">
            {/* Upload area */}
            <div
              className={`upload-area mb-3 ${dragover ? "dragover" : ""}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
              onDragLeave={() => setDragover(false)}
              onDrop={onDrop}
            >
              <i className="bi bi-cloud-arrow-up d-block mb-2"></i>
              <p className="mb-1 fw-semibold">Drag &amp; drop your file here</p>
              <p className="text-muted small mb-0">or click to browse</p>
              <input
                ref={inputRef}
                type="file"
                className="d-none"
                accept={accept}
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {/* File info */}
            {file && (
              <div className="alert alert-light d-flex align-items-center gap-2">
                <i className="bi bi-file-earmark-check text-success fs-5"></i>
                <div>
                  <strong className="d-block">{file.name}</strong>
                  <small className="text-muted">{(file.size / 1024).toFixed(1)} KB</small>
                </div>
              </div>
            )}

            {/* Progress */}
            {converting && (
              <div className="mb-3">
                <div className="spinner-overlay">
                  <div className="spinner-border spinner-border-sm" style={{ color }} role="status"></div>
                  <span>Converting... {progress}%</span>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: `${progress}%`, background: color }}
                  ></div>
                </div>
              </div>
            )}

            {/* Success */}
            {done && (
              <div className="alert alert-success d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill"></i>
                Conversion complete! Your file is ready to download.
              </div>
            )}

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-gradient flex-fill"
                disabled={!file || converting}
                onClick={convert}
              >
                {converting ? "Converting..." : "Convert"}
              </button>
              {done && (
                <button className="btn btn-success flex-fill">
                  <i className="bi bi-download me-2"></i>Download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileConverter;
