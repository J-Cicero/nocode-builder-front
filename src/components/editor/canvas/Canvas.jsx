import { useState } from "react";

const MOCK_ITEMS = [
  { id: "c1", type: "title", label: "Welcome to My App" },
  { id: "c2", type: "text", label: "Drag components from the left to build your page." },
  { id: "c3", type: "button", label: "Get Started", color: "#C4622D" },
];

export default function Canvas() {
  const [pages, setPages] = useState(["Home", "Products"]);
  const [activePage, setActivePage] = useState(0);
  const [items] = useState(MOCK_ITEMS);

  const addPage = () => setPages((p) => [...p, `Page ${p.length + 1}`]);

  const tabBtn = (label, idx) => {
    const active = activePage === idx;
    return (
      <button
        key={label}
        onClick={() => setActivePage(idx)}
        style={{
          padding: "10px 16px",
          borderRadius: 20,
          border: `1.5px solid ${active ? "#C4622D" : "#E8D9C4"}`,
          backgroundColor: active ? "#C4622D" : "#FFFFFF",
          color: active ? "#FFFFFF" : "#7A5C44",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          cursor: "pointer",
          transition: "all 150ms ease",
        }}
        onMouseEnter={(e) => !active && (e.currentTarget.style.borderColor = "#C4622D")}
        onMouseLeave={(e) => !active && (e.currentTarget.style.borderColor = "#E8D9C4")}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ flex: 1, backgroundColor: "#E8DDD0", display: "flex", flexDirection: "column", alignItems: "center", padding: 24, overflow: "auto" }}>
      <div style={{ display: "flex", gap: 8, alignSelf: "stretch", marginBottom: 20 }}>
        {pages.map((p, i) => tabBtn(p, i))}
        <button
          onClick={addPage}
          style={{
            padding: "10px 14px",
            borderRadius: 20,
            border: "1.5px dashed #E8D9C4",
            background: "transparent",
            color: "#7A5C44",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          + Add Page
        </button>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: -24,
            background: "linear-gradient(90deg, rgba(196,98,45,0.12), rgba(212,160,23,0.10), rgba(45,90,27,0.08))",
            filter: "blur(30px)",
            borderRadius: 30,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            width: 375,
            minHeight: 600,
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 8px 40px rgba(26,14,10,0.2)",
            overflow: "hidden",
            border: "1px solid #E8D9C4",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #E8D9C4", backgroundColor: "#FFFFFF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#1E6B3C" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44", letterSpacing: "2px", textTransform: "uppercase" }}>
                Mobile Preview
              </span>
            </div>
            <span style={{ padding: "4px 10px", borderRadius: 12, backgroundColor: "#FBF4E9", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#2C1A0E" }}>
              Page {activePage + 1}
            </span>
          </div>

          {items.length ? (
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #E8D9C4",
                    backgroundColor: "#FBF4E9",
                    cursor: "pointer",
                  }}
                >
                  {item.type === "title" && (
                    <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#2C1A0E" }}>
                      {item.label}
                    </h3>
                  )}
                  {item.type === "text" && (
                    <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>
                      {item.label}
                    </p>
                  )}
                  {item.type === "button" && (
                    <button
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "none",
                        backgroundColor: item.color,
                        color: "#FFFFFF",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {item.label}
                    </button>
                  )}

                  <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6, opacity: 0, transition: "opacity 150ms ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                  >
                    <button style={{ padding: 6, borderRadius: 6, border: "none", backgroundColor: "#C4622D", color: "#FFFFFF", cursor: "pointer" }}>✎</button>
                    <button style={{ padding: 6, borderRadius: 6, border: "none", backgroundColor: "#B03030", color: "#FFFFFF", cursor: "pointer" }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ height: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 20 }}>
              <div style={{ border: "2px dashed #E8D9C4", borderRadius: 12, padding: 24, width: "90%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D9C4" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#B09070" }}>Drag components here</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#C4C4C4" }}>to build your page</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
