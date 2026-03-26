import { useState } from "react";

const COMPONENTS_LIBRARY = {
  LAYOUT: [
    { id: "container", label: "Container", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2" /></svg>) },
    { id: "columns", label: "Columns", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="4" y="5" width="7" height="14" rx="1" /><rect x="13" y="5" width="7" height="14" rx="1" /></svg>) },
    { id: "divider", label: "Divider", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><path d="M4 12h16" strokeLinecap="round" /></svg>) },
  ],
  FORMS: [
    { id: "input", label: "Input", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="3" y="9" width="18" height="6" rx="2" /></svg>) },
    { id: "button", label: "Button", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="5" y="8" width="14" height="8" rx="2" /></svg>) },
    { id: "dropdown", label: "Dropdown", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M9 10l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
    { id: "checkbox", label: "Checkbox", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  ],
  DISPLAY: [
    { id: "title", label: "Title", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><path d="M5 6h14M9 6v12" strokeLinecap="round" /></svg>) },
    { id: "text", label: "Text", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><path d="M5 8h14M5 12h10M5 16h8" strokeLinecap="round" /></svg>) },
    { id: "image", label: "Image", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 14l3-3 5 5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="9" r="1.2" /></svg>) },
    { id: "list", label: "List", icon: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2"><path d="M9 6h10M9 12h10M9 18h10M5 6h.01M5 12h.01M5 18h.01" strokeLinecap="round" /></svg>) },
  ],
};

export default function ComponentPanel() {
  const [open, setOpen] = useState({ LAYOUT: true, FORMS: true, DISPLAY: true });

  const sectionHeader = (label) => (
    <button
      onClick={() => setOpen((p) => ({ ...p, [label]: !p[label] }))}
      style={{
        width: "100%",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        background: "transparent",
        border: "none",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "1px",
        color: "#7A5C44",
      }}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7A5C44"
        strokeWidth="2"
        style={{ transform: open[label] ? "rotate(180deg)" : "rotate(0)", transition: "transform 150ms ease" }}
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div style={{ width: 220, backgroundColor: "#FFFFFF", borderRight: "1px solid #E8D9C4", overflowY: "auto", flexShrink: 0 }}>
      <div style={{ padding: 16, borderBottom: "1px solid #E8D9C4" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#2C1A0E" }}>Components</div>
      </div>

      {Object.entries(COMPONENTS_LIBRARY).map(([section, comps]) => (
        <div key={section} style={{ borderBottom: "1px solid #E8D9C4" }}>
          {sectionHeader(section)}
          {open[section] && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, padding: "8px 16px 12px" }}>
              {comps.map((comp) => (
                <div
                  key={comp.id}
                  draggable
                  style={{
                    backgroundColor: "#FBF4E9",
                    border: "1px solid #E8D9C4",
                    borderRadius: 8,
                    padding: "10px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    cursor: "grab",
                    transition: "background-color 150ms ease, border-color 150ms ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF0E8"; e.currentTarget.style.borderColor = "#C4622D"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FBF4E9"; e.currentTarget.style.borderColor = "#E8D9C4"; }}
                >
                  {comp.icon()}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#2C1A0E", textAlign: "center" }}>{comp.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
