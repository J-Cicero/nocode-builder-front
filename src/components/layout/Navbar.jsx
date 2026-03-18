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
    <nav className="bg-dark h-16 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Logo */}
      <div className="text-xl font-playfair-display font-bold text-secondary">
        BuildrAfrica
      </div>

      {/* User menu */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
            {getInitials(user?.name || "User")}
          </div>
          <div className="text-white text-sm font-dm-sans">{user?.name}</div>
        </div>

        {/* Dropdown toggle */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-white hover:text-secondary transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-48">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // navigate("/profile");
              }}
              className="w-full text-left px-4 py-2.5 text-text hover:bg-bg transition-colors first:rounded-t-lg font-dm-sans"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2.5 text-error hover:bg-bg transition-colors last:rounded-b-lg font-dm-sans"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
