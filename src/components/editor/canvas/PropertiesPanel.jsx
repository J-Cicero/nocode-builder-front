import { useState } from "react";
import Input from "../../common/Input";

export default function PropertiesPanel() {
  const [selected] = useState(true); // mock: pretend something is selected
  const [properties, setProperties] = useState({
    label: "Button CTA",
    bgColor: "#C4622D",
    textColor: "#FFFFFF",
  });

  const handleChange = (key, value) => setProperties((p) => ({ ...p, [key]: value }));

  const headerStyle = {
    padding: 16,
    borderBottom: "1px solid #E8D9C4",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  };

  if (!selected) {
    return (
      <div style={{ width: 260, backgroundColor: "#FFFFFF", borderLeft: "1px solid #E8D9C4", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
        <div>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8D9C4" strokeWidth="2" style={{ margin: "0 auto" }}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#B09070", marginTop: 12 }}>Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const sectionLabel = (text) => (
    <div style={{ padding: "10px 16px", backgroundColor: "#FBF4E9", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#7A5C44", letterSpacing: "1px" }}>
      {text}
    </div>
  );

  return (
    <div style={{ width: 260, backgroundColor: "#FFFFFF", borderLeft: "1px solid #E8D9C4", overflowY: "auto", flexShrink: 0 }}>
      <div style={headerStyle}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#2C1A0E" }}>Properties</div>
      </div>

      {sectionLabel("CONTENT")}
      <div style={{ padding: "10px 16px" }}>
        <Input
          label="Label"
          value={properties.label}
          onChange={(e) => handleChange("label", e.target.value)}
        />
      </div>

      {sectionLabel("STYLE")}
      <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>Background</label>
          <input
            type="color"
            value={properties.bgColor}
            onChange={(e) => handleChange("bgColor", e.target.value)}
            style={{ width: "100%", height: 36, border: "1px solid #E8D9C4", borderRadius: 8, cursor: "pointer" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>Text Color</label>
          <input
            type="color"
            value={properties.textColor}
            onChange={(e) => handleChange("textColor", e.target.value)}
            style={{ width: "100%", height: 36, border: "1px solid #E8D9C4", borderRadius: 8, cursor: "pointer" }}
          />
        </div>
      </div>

      {sectionLabel("DATA")}
      <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>
          Bind to field
        </label>
        <select
          style={{
            padding: "10px 12px",
            border: "1.5px solid #E8D9C4",
            borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option>Not bound</option>
          <option>Name</option>
          <option>Email</option>
        </select>
      </div>

      <div style={{ padding: "16px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#B09070", marginBottom: 8 }}>Preview</p>
        <div
          style={{
            padding: "12px 16px",
            textAlign: "center",
            borderRadius: 10,
            border: "1px dashed #E8D9C4",
            backgroundColor: properties.bgColor,
            color: properties.textColor,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          {properties.label}
        </div>
      </div>
    </div>
  );
}
