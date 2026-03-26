import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = (user?.name || "User")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const navStyle = {
    height: 64,
    backgroundColor: "#1A0E0A",
    position: "sticky",
    top: 0,
    zIndex: 100,
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoRow = {
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const dropdownStyle = {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8D9C4",
    borderRadius: 8,
    boxShadow: "0 12px 32px rgba(26,14,10,0.18)",
    minWidth: 180,
    zIndex: 200,
    overflow: "hidden",
  };

  const menuItem = (color, hoverBg, onClick, label) => (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "12px 16px",
        background: "transparent",
        border: "none",
        color,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {label}
    </button>
  );

  return (
    <nav style={navStyle} ref={menuRef}>
      <div style={logoRow}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: "#C4622D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          B
        </div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#D4A017", lineHeight: 1 }}>
            BuildrAfrica
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#A08060", letterSpacing: 1 }}>
            No-code studio
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "#C4622D",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {initials}
        </div>
        <div style={{ color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
          {user?.name || "User"}
        </div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A08060" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div style={dropdownStyle}>
            {menuItem("#2C1A0E", "#FBF4E9", () => setOpen(false), "Profile")}
            <div style={{ height: 1, backgroundColor: "#E8D9C4" }} />
            {menuItem("#B03030", "#FFF5F5", () => { setOpen(false); logout(); navigate("/login"); }, "Sign Out")}
          </div>
        )}
      </div>
    </nav>
  );
}
