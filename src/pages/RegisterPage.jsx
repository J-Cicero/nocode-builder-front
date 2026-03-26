import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import AfricanPattern from "../components/common/AfricanPattern";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, token, isLoading } = useAuth();
  const [plan, setPlan] = useState("free");
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    birth_place: "",
    birth_date: "",
    country: "",
    company_name: "",
    company_size: "",
  });
  const [error, setError] = useState("");

  const kenteId = useMemo(() => `kente-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => {
    const hasToken = token || localStorage.getItem("access_token");
    if (hasToken) navigate("/dashboard");
  }, [token, navigate]);

  const strength = (() => {
    const len = form.password.length;
    if (len === 0) return { width: "0%", color: "#E8D9C4", label: "" };
    if (len < 6) return { width: "25%", color: "#B03030", label: "Weak" };
    if (len < 9) return { width: "50%", color: "#D4A017", label: "Fair" };
    if (len < 12) return { width: "75%", color: "#C4622D", label: "Good" };
    return { width: "100%", color: "#2D5A1B", label: "Strong" };
  })();

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.surname || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (plan === "enterprise" && !form.company_name) {
      setError("Please provide your company name.");
      return;
    }
    if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password) || !/[@$!%*?&]/.test(form.password)) {
      setError("Password must contain a letter, a number and a special char (@$!%*?&).");
      return;
    }
    try {
      const payload = {
        email: form.email,
        name: form.name?.trim(),
        surname: form.surname?.trim(),
        birth_place: form.birth_place?.trim() || null,
        birth_date: form.birth_date || null,
        country: form.country?.trim() || null,
        phone: form.phone?.trim() || null,
        password: form.password,
        ...(plan === "enterprise"
          ? { company_name: form.company_name, company_size: form.company_size }
          : {}),
      };
      await register(payload, plan);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Registration failed.");
    }
  };

  const planCard = (id, title, subtitle, price, iconPath) => {
    const active = plan === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setPlan(id)}
        style={{
          flex: 1,
          padding: 16,
          borderRadius: 10,
          border: `2px solid ${active ? "#C4622D" : "#E8D9C4"}`,
          backgroundColor: active ? "#FFF0E8" : "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          cursor: "pointer",
          transition: "all 150ms ease",
        }}
        onMouseEnter={(e) => !active && (e.currentTarget.style.borderColor = "#C4622D")}
        onMouseLeave={(e) => !active && (e.currentTarget.style.borderColor = "#E8D9C4")}
      >
        <div style={{ color: "#C4622D" }}>{iconPath}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#2C1A0E" }}>{title}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>{subtitle}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#2D5A1B" }}>{price}</div>
      </button>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh", backgroundColor: "#FBF4E9", animation: "pageIn 400ms ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes pageIn { from { opacity:0; transform: translateY(20px);} to { opacity:1; transform: translateY(0);} }
        @media (max-width: 768px) {
          .left-col { display:none; }
          .right-col { width:100% !important; }
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

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, maxWidth: 540, textAlign: "left" }}>
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
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>Already have an account?</span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ marginLeft: 8, background: "transparent", border: "none", color: "#C4622D", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
          >
            Sign in →
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "3px", color: "#C4622D", fontWeight: 600 }}>
              GET STARTED
            </p>
            <h2 style={{ margin: "4px 0 6px", fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#2C1A0E" }}>
              Create your account
            </h2>
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44", lineHeight: 1.6 }}>
              Join thousands of builders across Africa and beyond.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              {planCard(
                "free",
                "Free Plan",
                "Perfect to get started",
                "$0 / month",
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {planCard(
                "enterprise",
                "Enterprise",
                "For growing teams",
                "Custom pricing",
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2">
                  <rect x="3" y="7" width="5" height="13" rx="1" />
                  <rect x="10" y="4" width="5" height="16" rx="1" />
                  <rect x="17" y="9" width="4" height="11" rx="1" />
                </svg>
              )}
            </div>

            {/* Form fields */}
            <div style={{ display: "flex", gap: 12 }}>
              <Input
                label="First Name"
                name="name"
                placeholder="Jean"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                label="Last Name"
                name="surname"
                placeholder="Dupont"
                value={form.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
              />
            </div>

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="jean@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3.5" y="5" width="17" height="14" rx="2" />
                  <path d="m4 7 8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="5" y="10" width="14" height="10" rx="2" />
                    <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
                  </svg>
                }
              />
              <div style={{ height: 4, borderRadius: 2, backgroundColor: "#E8D9C4", overflow: "hidden" }}>
                <div style={{ width: strength.width, height: "100%", backgroundColor: strength.color, transition: "width 300ms ease" }} />
              </div>
              {strength.label && (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#7A5C44" }}>
                  {strength.label}
                </span>
              )}
            </div>

            <Input
              label="Country (optional)"
              name="country"
              placeholder="Côte d'Ivoire"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />

            <Input
              label="Birth place (optional)"
              name="birth_place"
              placeholder="Abidjan"
              value={form.birth_place}
              onChange={(e) => handleChange("birth_place", e.target.value)}
            />

            <Input
              label="Birth date (optional)"
              name="birth_date"
              type="date"
              value={form.birth_date}
              onChange={(e) => handleChange("birth_date", e.target.value)}
            />

            <Input
              label="Phone (optional)"
              name="phone"
              type="tel"
              placeholder="+225 07 00 00 00"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 4h4l2 5-3 2c1.2 2.4 3.1 4.3 5.5 5.5l2-3 5 2v4c0 .6-.4 1-1 1A16 16 0 0 1 4 5c0-.6.4-1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            {plan === "enterprise" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 6 }}>
                <Input
                  label="Company Name"
                  name="company_name"
                  placeholder="Your company"
                  value={form.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#2C1A0E" }}>
                    Company Size
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      tabIndex={0}
                      role="listbox"
                      style={{
                        padding: "12px 16px",
                        border: "1.5px solid #E8D9C4",
                        borderRadius: 8,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C4622D")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8D9C4")}
                      onClick={(e) => {
                        const menu = e.currentTarget.nextSibling;
                        menu.style.display = menu.style.display === "block" ? "none" : "block";
                      }}
                    >
                      <span>{form.company_size || "Select size"}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A5C44" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E8D9C4",
                        borderRadius: 8,
                        zIndex: 10,
                        boxShadow: "0 10px 24px rgba(26,14,10,0.12)",
                      }}
                    >
                      {["1-10", "11-50", "51-200", "200+"].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            handleChange("company_size", opt);
                            const menu = document.activeElement?.nextSibling;
                            if (menu) menu.style.display = "none";
                          }}
                          style={{
                            padding: "10px 14px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "#2C1A0E",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF0E8")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div style={{ backgroundColor: "#FFF5F5", borderLeft: "3px solid #B03030", borderRadius: "0 6px 6px 0", padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#B03030" }}>
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth loading={isLoading}>
              Create Account
            </Button>

            <div style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{ background: "transparent", border: "none", color: "#C4622D", fontWeight: 600, cursor: "pointer" }}
              >
                Sign in
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
