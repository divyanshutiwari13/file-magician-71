import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!name.trim()) errs.push("Full name is required.");
    if (!email.trim()) errs.push("Email is required.");
    if (password.length < 6) errs.push("Password must be at least 6 characters.");
    if (password !== confirm) errs.push("Passwords do not match.");
    setErrors(errs);
    if (!errs.length) alert("Signup is UI only – no backend connected.");
  };

  return (
    <div className="container py-5">
      <div className="card auth-card">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <i className="bi bi-person-plus-fill display-4 text-primary"></i>
            <h3 className="fw-bold mt-2">Create Account</h3>
            <p className="text-muted">Sign up to get started</p>
          </div>

          {errors.length > 0 && (
            <div className="alert alert-danger py-2">
              {errors.map((e, i) => <div key={i} className="small">{e}</div>)}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input className="form-control" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-gradient w-100 py-2 mb-3">Sign Up</button>
            <p className="text-center text-muted mb-0">
              Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
