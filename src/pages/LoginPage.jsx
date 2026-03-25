import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const kenteId = useMemo(() => `kente-${Math.random().toString(36).slice(2, 8)}`, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .login-page {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
          background: #FBF4E9;
          color: #2C1A0E;
          font-family: 'DM Sans', sans-serif;
        }
        .left {
          position: relative;
          width: 50%;
          background: #1A0E0A;
          color: #FFFFFF;
          padding: 48px;
          display: flex;
          overflow: hidden;
        }
        .pattern {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          pointer-events: none;
        }
        .left-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #C4622D;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #FFFFFF;
        }
        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 600;
          color: #D4A017;
        }
        .hero {
          text-align: left;
          margin: 0 auto;
          max-width: 540px;
        }
        .heading {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          line-height: 1.15;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 18px;
        }
        .line {
          width: 60px;
          height: 2px;
          background: #D4A017;
          margin-bottom: 16px;
        }
        .subtitle {
          font-size: 16px;
          color: #A08060;
          margin: 0;
        }
        .stats {
          display: flex;
          align-items: center;
          gap: 18px;
          color: #A08060;
          font-size: 14px;
        }
        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .number {
          color: #D4A017;
          font-size: 22px;
          font-weight: 600;
        }
        .divider {
          width: 1px;
          align-self: stretch;
          background: #3D2010;
        }
        .right {
          width: 50%;
          background: #FBF4E9;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 48px 32px;
        }
        .card {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .top-link {
          align-self: flex-end;
          font-size: 14px;
          color: #7A5C44;
        }
        .top-link button {
          background: none;
          border: none;
          padding: 0;
          margin-left: 6px;
          color: #C4622D;
          font-weight: 600;
          cursor: pointer;
        }
        .eyebrow {
          font-size: 11px;
          letter-spacing: 0.28em;
          color: #C4622D;
          font-weight: 600;
          margin: 0;
        }
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: #2C1A0E;
          margin: 4px 0 6px;
        }
        .subtitle-right {
          font-size: 14px;
          color: #7A5C44;
          margin: 0;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .label {
          font-size: 14px;
          font-weight: 600;
          color: #2C1A0E;
        }
        .input-wrap {
          position: relative;
        }
        .input {
          width: 100%;
          border: 1.5px solid #E8D9C4;
          border-radius: 8px;
          background: #FFFFFF;
          padding: 12px 16px 12px 44px;
          font-size: 15px;
          color: #2C1A0E;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }
        .input::placeholder {
          color: #B09070;
        }
        .input:focus {
          border-color: #C4622D;
          box-shadow: 0 0 0 3px rgba(196, 98, 45, 0.15);
          outline: none;
        }
        .icon-left, .icon-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #7A5C44;
        }
        .icon-left { left: 14px; }
        .icon-right { right: 14px; cursor: pointer; }
        .forgot {
          align-self: flex-end;
          font-size: 13px;
          color: #C4622D;
          background: none;
          border: none;
          cursor: pointer;
        }
        .submit {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 8px;
          background: #C4622D;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(196, 98, 45, 0.2);
        }
        .submit:hover { background: #A04E22; transform: translateY(-1px); }
        .submit:active { transform: translateY(1px); }
        .submit:disabled { opacity: 0.8; cursor: not-allowed; }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #FFFFFF;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .separator {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #7A5C44;
          font-size: 13px;
        }
        .separator-line {
          flex: 1;
          height: 1px;
          background: #E8D9C4;
        }
        .google {
          width: 100%;
          height: 48px;
          border-radius: 8px;
          border: 1.5px solid #E8D9C4;
          background: #FFFFFF;
          color: #2C1A0E;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border 0.2s ease;
        }
        .google:hover { border-color: #C4622D; }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #7A5C44;
        }
        .footer button {
          background: none;
          border: none;
          color: #C4622D;
          font-weight: 700;
          cursor: pointer;
        }
        .bottom-note {
          text-align: center;
          font-size: 11px;
          color: #B09070;
          margin-top: 12px;
        }
        .error-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #FFF0F0;
          border-left: 3px solid #B03030;
          color: #B03030;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
        }
        @media (max-width: 767px) {
          .left { display: none; }
          .right { width: 100%; padding: 40px 24px; }
          .login-page { background: #FBF4E9; }
        }
      `}</style>

      {/* Left column */}
      <div className="left">
        <div className="pattern">
          <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={kenteId} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <g fill="#C4622D">
                  <path d="M0 0h40L0 40Z" />
                  <path d="M40 40h40L40 80Z" />
                  <path d="M40 0h40L40 40Z" />
                  <path d="M0 40h40L0 80Z" />
                  <path d="M0 0l80 80" stroke="#C4622D" strokeWidth="4" />
                  <path d="M80 0 0 80" stroke="#C4622D" strokeWidth="4" />
                  <path d="M40 0v80" stroke="#C4622D" strokeWidth="3" />
                  <path d="M0 40h80" stroke="#C4622D" strokeWidth="3" />
                </g>
              </pattern>
            </defs>
            <rect width="400" height="400" fill={`url(#${kenteId})`} />
          </svg>
        </div>

        <div className="left-content">
          <div className="logo">
            <div className="logo-box">B</div>
            <div className="logo-text">BuildrAfrica</div>
          </div>

          <div className="hero">
            <h1 className="heading">
              Build apps.
              <br />
              No code needed.
            </h1>
            <div className="line" />
            <p className="subtitle">
              Create powerful applications visually, connect your data, automate your workflows — all
              without writing a single line of code.
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="number">2,400+</span>
              <span>Apps Built</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="number">150+</span>
              <span>Countries</span>
            </div>
            <div className="divider" />
            <div className="stat">
              <span className="number">Free</span>
              <span>To Start</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="right">
        <div className="card">
          <div className="top-link">
            New here?
            <button type="button" onClick={() => navigate("/register")}>
              Create an account →
            </button>
          </div>

          <div>
            <p className="eyebrow">WELCOME BACK</p>
            <h2 className="title">Sign in to your account</h2>
            <p className="subtitle-right">Enter your credentials to access your projects.</p>
          </div>

          {error && (
            <div className="error-banner">
              <span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 8v5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 16h.01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="m10.073 4.247-7.03 12.153A2 2 0 0 0 4.73 19.75h14.54a2 2 0 0 0 1.687-3.35L13.927 4.247a2 2 0 0 0-3.854 0Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="field">
              <label className="label">Email address</label>
              <div className="input-wrap">
                <span className="icon-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3.5" y="5" width="17" height="14" rx="2" strokeWidth="1.5" />
                    <path d="m4 7 8 5 8-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="input-wrap">
                <span className="icon-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="10" width="14" height="10" rx="2" strokeWidth="1.5" />
                    <path d="M9 10V7a3 3 0 1 1 6 0v3" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="icon-right" onClick={() => setShowPassword((p) => !p)} aria-label="Toggle password">
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="m3 3 18 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M10.477 5.112C10.974 5.038 11.484 5 12 5c4.478 0 8.268 2.943 9.542 7a10.73 10.73 0 0 1-2.104 3.623"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.598 6.608C4.65 7.83 3.215 9.68 2.458 12c1.274 4.057 5.064 7 9.542 7 1.237 0 2.437-.2 3.568-.572"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </div>
              <button className="forgot" type="button" onClick={() => alert("Password reset not implemented yet")}>
                Forgot password?
              </button>
            </div>

            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="separator">
            <div className="separator-line" />
            <span>or continue with</span>
            <div className="separator-line" />
          </div>

          <button className="google" type="button">
            <svg width="20" height="20" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272.1v95.4h146.9c-6.3 34.1-25.1 62.9-53.5 82.2v68h86.5c50.6-46.6 81.5-115.4 81.5-195.2z" fill="#4285f4" />
              <path d="M272.1 544.3c72.8 0 133.8-24.1 178.4-65.7l-86.5-68c-24.1 16.3-55 26-91.9 26-70.6 0-130.4-47.6-151.8-111.5H30.6v69.9c44.6 88.5 136.3 148.3 241.5 148.3z" fill="#34a853" />
              <path d="M120.3 325.1c-11-32.9-11-68.4 0-101.3V154H30.6c-39.2 78.4-39.2 171.8 0 250.2z" fill="#fbbc04" />
              <path d="M272.1 107.7c38.9-.6 76.1 13.6 104.4 39.8l77.8-77.8C405.7 24.1 344.9 0 272.1 0 166.9 0 75.2 59.8 30.6 148.3l89.7 69.8C141.7 155.3 201.5 107.7 272.1 107.7z" fill="#ea4335" />
            </svg>
            Continue with Google
          </button>

          <div className="footer">
            Don't have an account?{" "}
            <button type="button" onClick={() => navigate("/register")}>
              Create one for free
            </button>
          </div>

          <div className="bottom-note">© 2025 BuildrAfrica · Terms · Privacy</div>
        </div>
      </div>
    </div>
  );
}
