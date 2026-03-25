import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border/80">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white font-semibold flex items-center justify-center shadow-lg shadow-primary/30">
            BA
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted font-semibold">buildr</p>
            <p className="font-playfair-display text-xl text-text">Africa Studio</p>
          </div>
        </div>

        {/* User menu */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-full bg-white/70 border border-border/70 shadow-sm">
            <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-primary/40 shadow-md">
              {getInitials(user?.name || "User")}
            </div>
            <div className="text-sm text-text font-semibold">{user?.name}</div>
          </div>

          {/* Dropdown toggle */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-10 w-10 rounded-full bg-white border border-border/80 text-text hover:shadow-md transition-all"
          >
            <svg
              className={`w-4 h-4 mx-auto transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-3 bg-white rounded-xl shadow-2xl border border-border/80 min-w-48 overflow-hidden">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-text hover:bg-bg transition-colors font-dm-sans"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2.5 text-error hover:bg-bg transition-colors font-dm-sans"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
