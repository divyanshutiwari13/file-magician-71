import { useState, useRef, DragEvent, useEffect } from "react";

const ResizeImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspect, setAspect] = useState(true);
  const [done, setDone] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ratio = origW && origH ? origW / origH : 1;

  const handleFile = (f: File) => {
    setFile(f);
    setDone(false);
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.width);
      setOrigH(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const changeW = (v: number) => {
    setWidth(v);
    if (aspect) setHeight(Math.round(v / ratio));
    setDone(false);
  };
  const changeH = (v: number) => {
    setHeight(v);
    if (aspect) setWidth(Math.round(v * ratio));
    setDone(false);
  };

  const resize = () => {
    setResizing(true);
    setTimeout(() => {
      setResizing(false);
      setDone(true);
    }, 1200);
  };

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <i className="bi bi-aspect-ratio display-5 mb-2"></i>
          <h2 className="fw-bold">Image Resize Tool</h2>
          <p className="opacity-75 mb-0">Change image dimensions to fit your needs</p>
        </div>
      </div>
      <div className="container py-4" style={{ maxWidth: 640 }}>
        <div className="card tool-card">
          <div className="card-body p-4">
            <div
              className={`upload-area mb-3 ${dragover ? "dragover" : ""}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
              onDragLeave={() => setDragover(false)}
              onDrop={onDrop}
            >
              <i className="bi bi-cloud-arrow-up d-block mb-2"></i>
              <p className="mb-1 fw-semibold">Drag &amp; drop an image here</p>
              <p className="text-muted small mb-0">JPG, PNG, WEBP, GIF</p>
              <input
                ref={inputRef}
                type="file"
                className="d-none"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {preview && (
              <div className="text-center mb-3">
                <img src={preview} alt="Preview" className="img-preview-box" />
                <p className="text-muted small mt-2">Original: {origW} × {origH} px</p>
              </div>
            )}

            {file && (
              <>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold">Width (px)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={width}
                      onChange={(e) => changeW(Number(e.target.value))}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold">Height (px)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={height}
                      onChange={(e) => changeH(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="aspectCheck"
                    checked={aspect}
                    onChange={(e) => setAspect(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="aspectCheck">
                    Maintain aspect ratio
                  </label>
                </div>
                {done && (
                  <div className="alert alert-info small">
                    <i className="bi bi-arrows-angle-expand me-2"></i>
                    Resized: {width} × {height} px
                  </div>
                )}
              </>
            )}

            {resizing && (
              <div className="spinner-overlay">
                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                <span>Resizing...</span>
              </div>
            )}

            {done && (
              <div className="alert alert-success d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill"></i>
                Image resized successfully!
              </div>
            )}

            <div className="d-flex gap-2">
              <button className="btn btn-gradient flex-fill" disabled={!file || resizing} onClick={resize}>
                {resizing ? "Resizing..." : "Resize"}
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

export default ResizeImage;
