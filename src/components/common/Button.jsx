export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  children,
  style = {},
}) {
  const baseStyle = {
    border: "none",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 150ms ease",
    transform: loading ? "translateY(0)" : "none",
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
  };

  const variantStyle = {
    primary: {
      backgroundColor: "#C4622D",
      color: "#FFFFFF",
      boxShadow: "0 6px 18px rgba(196,98,45,0.25)",
    },
    secondary: {
      backgroundColor: "transparent",
      border: "1.5px solid #C4622D",
      color: "#C4622D",
    },
    danger: {
      backgroundColor: "#B03030",
      color: "#FFFFFF",
    },
    ghost: {
      backgroundColor: "transparent",
      border: "1.5px solid #E8D9C4",
      color: "#7A5C44",
    },
  }[variant];

  const sizeStyle = {
    sm: { padding: "6px 14px", fontSize: 13 },
    md: { padding: "10px 20px", fontSize: 15 },
    lg: { padding: "14px 28px", fontSize: 16 },
  }[size];

  const handleMouseEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-2px)";
    if (variant === "primary") e.currentTarget.style.backgroundColor = "#A04E22";
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "none";
    if (variant === "primary") e.currentTarget.style.backgroundColor = "#C4622D";
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(1px)";
  };

  const handleMouseUp = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ ...baseStyle, ...variantStyle, ...sizeStyle, ...style }}
    >
      {loading ? (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            style={{ animation: "spin 0.8s linear infinite" }}
          >
            <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="3" opacity="0.25" fill="none" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#FFFFFF" strokeWidth="3" fill="none" />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
