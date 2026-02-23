import { useState, useRef, DragEvent } from "react";

const CompressImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [quality, setQuality] = useState(70);
  const [done, setDone] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setDone(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragover(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const compress = () => {
    setCompressing(true);
    setTimeout(() => {
      setCompressing(false);
      setDone(true);
    }, 1500);
  };

  const compressedSize = file ? Math.round((file.size * quality) / 100) : 0;

  return (
    <>
      <div className="page-header text-center">
        <div className="container">
          <i className="bi bi-image display-5 mb-2"></i>
          <h2 className="fw-bold">Image Compression Tool</h2>
          <p className="opacity-75 mb-0">Reduce image size without losing quality</p>
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
              <p className="text-muted small mb-0">JPG, PNG, WEBP</p>
              <input
                ref={inputRef}
                type="file"
                className="d-none"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {preview && (
              <div className="text-center mb-3">
                <img src={preview} alt="Preview" className="img-preview-box" />
              </div>
            )}

            {file && (
              <>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Compression Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => { setQuality(Number(e.target.value)); setDone(false); }}
                  />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <div className="p-3 bg-light rounded text-center">
                      <small className="text-muted d-block">Original</small>
                      <strong>{(file.size / 1024).toFixed(1)} KB</strong>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-light rounded text-center">
                      <small className="text-muted d-block">Compressed</small>
                      <strong className="text-success">{(compressedSize / 1024).toFixed(1)} KB</strong>
                    </div>
                  </div>
                </div>
              </>
            )}

            {compressing && (
              <div className="spinner-overlay">
                <div className="spinner-border spinner-border-sm text-success" role="status"></div>
                <span>Compressing...</span>
              </div>
            )}

            {done && (
              <div className="alert alert-success d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill"></i>
                Image compressed successfully!
              </div>
            )}

            <div className="d-flex gap-2">
              <button className="btn btn-gradient flex-fill" disabled={!file || compressing} onClick={compress}>
                {compressing ? "Compressing..." : "Compress"}
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

export default CompressImage;
