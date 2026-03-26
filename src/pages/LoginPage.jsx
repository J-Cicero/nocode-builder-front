import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import AfricanPattern from "../components/common/AfricanPattern";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, token, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const kenteId = useMemo(() => `kente-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => {
    const hasToken = token || localStorage.getItem("access_token");
    if (hasToken) navigate("/dashboard");
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh", backgroundColor: "#FBF4E9", animation: "pageIn 400ms ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes pageIn { from { opacity:0; transform: translateY(20px);} to { opacity:1; transform: translateY(0);} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .left-col { display: none; }
          .right-col { width: 100% !important; }
        }
      `}</style>

      {/* Left column */}
      <div className="left-col" style={{ width: "50%", backgroundColor: "#1A0E0A", position: "relative", overflow: "hidden", display: "flex" }}>
        <AfricanPattern key={kenteId} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#C4622D", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>
              B
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#D4A017" }}>BuildrAfrica</div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, maxWidth: 540 }}>
            <h1 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 52, lineHeight: 1.2, color: "#FFFFFF" }}>
              Build apps.<br />No code<br />needed.
            </h1>
            <div style={{ width: 64, height: 3, backgroundColor: "#D4A017" }} />
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: "#A08060", maxWidth: 380 }}>
              Create powerful applications visually, connect your data, and automate workflows — without writing a single line of code.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 0, color: "#A08060", fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
            {[
              { num: "2,400+", label: "Apps Built" },
              { num: "150+", label: "Countries" },
              { num: "Free", label: "To Start" },
            ].map((stat, idx) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
                {idx !== 0 && <div style={{ width: 1, height: 40, backgroundColor: "#3D2010", margin: "0 12px" }} />}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px" }}>
                  <span style={{ color: "#D4A017", fontSize: 28, fontWeight: 700 }}>{stat.num}</span>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="right-col" style={{ width: "50%", backgroundColor: "#FBF4E9", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 40px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>New here?</span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{ marginLeft: 8, background: "transparent", border: "none", color: "#C4622D", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
          >
            Create an account →
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "3px", color: "#C4622D", fontWeight: 600 }}>
              WELCOME BACK
            </p>
            <h2 style={{ margin: "4px 0 6px", fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#2C1A0E" }}>
              Sign in to your account
            </h2>
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44", lineHeight: 1.6 }}>
              Enter your credentials to access your workspace.
            </p>

            {error && (
              <div style={{ backgroundColor: "#FFF5F5", borderLeft: "3px solid #B03030", borderRadius: "0 6px 6px 0", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B03030" strokeWidth="1.6">
                  <path d="M12 8v5" strokeLinecap="round" />
                  <circle cx="12" cy="15.5" r="0.8" fill="#B03030" />
                  <path d="M10.07 4.25 3.04 16.4A2 2 0 0 0 4.74 19.7h14.52a2 2 0 0 0 1.7-3.3L13.93 4.25a2 2 0 0 0-3.86 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#B03030" }}>{error}</span>
              </div>
            )}

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#2C1A0E" }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#7A5C44" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3.5" y="5" width="17" height="14" rx="2" />
                    <path d="m4 7 8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 44px",
                    border: "1.5px solid #E8D9C4",
                    borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "#2C1A0E",
                    outline: "none",
                    transition: "border 200ms ease, box-shadow 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C4622D";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,98,45,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E8D9C4";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#2C1A0E" }}>
                Password
              </label>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => alert("Password reset not implemented yet")}
                  style={{ background: "transparent", border: "none", color: "#C4622D", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#7A5C44" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="5" y="10" width="14" height="10" rx="2" />
                    <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
                  </svg>
                </span>
                <span
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#7A5C44", cursor: "pointer" }}
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.5 10.5a3 3 0 0 0 4.95 3.036" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M6.6 6.6C4.6 7.8 3.2 9.65 2.5 12c1.3 4.06 5.1 7 9.5 7 1.24 0 2.44-.2 3.57-.57"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.4 17.4c2-1.2 3.4-3.05 4.1-5.4C20.2 7.94 16.4 5 12 5c-.52 0-1.03.04-1.52.12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path
                        d="M2.5 12c1.3-4.06 5.1-7 9.5-7s8.2 2.94 9.5 7c-1.3 4.06-5.1 7-9.5 7s-8.2-2.94-9.5-7Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 44px",
                    border: "1.5px solid #E8D9C4",
                    borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "#2C1A0E",
                    outline: "none",
                    transition: "border 200ms ease, box-shadow 200ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C4622D";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,98,45,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E8D9C4";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                height: 48,
                backgroundColor: "#C4622D",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                transition: "transform 150ms ease, background-color 150ms ease",
              }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = "#A04E22", e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#C4622D"; e.currentTarget.style.transform = "none"; }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            >
              {isLoading ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "3px solid rgba(255,255,255,0.35)",
                      borderTopColor: "#FFFFFF",
                      animation: "spin 0.8s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 1, backgroundColor: "#E8D9C4" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A5C44" }}>or continue with</span>
              <div style={{ flex: 1, height: 1, backgroundColor: "#E8D9C4" }} />
            </div>

            <button
              type="button"
              style={{
                width: "100%",
                height: 44,
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #E8D9C4",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                <path d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272.1v95.4h146.9c-6.3 34.1-25.1 62.9-53.5 82.2v68h86.5c50.6-46.6 81.5-115.4 81.5-195.2z" fill="#4285f4" />
                <path d="M272.1 544.3c72.8 0 133.8-24.1 178.4-65.7l-86.5-68c-24.1 16.3-55 26-91.9 26-70.6 0-130.4-47.6-151.8-111.5H30.6v69.9c44.6 88.5 136.3 148.3 241.5 148.3z" fill="#34a853" />
                <path d="M120.3 325.1c-11-32.9-11-68.4 0-101.3V154H30.6c-39.2 78.4-39.2 171.8 0 250.2z" fill="#fbbc04" />
                <path d="M272.1 107.7c38.9-.6 76.1 13.6 104.4 39.8l77.8-77.8C405.7 24.1 344.9 0 272.1 0 166.9 0 75.2 59.8 30.6 148.3l89.7 69.8C141.7 155.3 201.5 107.7 272.1 107.7z" fill="#ea4335" />
              </svg>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#2C1A0E" }}>Continue with Google</span>
            </button>

            <div style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                style={{ background: "transparent", border: "none", color: "#C4622D", fontWeight: 600, cursor: "pointer" }}
              >
                Create one for free
              </button>
            </div>
          </form>
        </div>

        <div style={{ padding: 20, textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#B09070" }}>
          © 2025 BuildrAfrica · Terms · Privacy
        </div>
      </div>
    </div>
  );
}
