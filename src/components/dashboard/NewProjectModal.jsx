import { useState } from "react";
import Button from "../common/Button";

export default function NewProjectModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate?.({
      name,
      description,
      is_public: isPublic,
    });
    setName("");
    setDescription("");
    setIsPublic(false);
    onClose?.();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(26,14,10,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        backdropFilter: "blur(4px)",
        animation: "fadeIn 250ms ease",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: 32,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 20px 60px rgba(26,14,10,0.3)",
          animation: "popIn 250ms ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#2C1A0E" }}>
            New Project
          </h3>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="#7A5C44" fill="none" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#2C1A0E" }}>Project Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              style={{
                padding: "12px 16px",
                border: "1.5px solid #E8D9C4",
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
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

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#2C1A0E" }}>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe what you're building"
              style={{
                padding: "12px 16px",
                border: "1.5px solid #E8D9C4",
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                outline: "none",
                resize: "vertical",
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

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#2C1A0E" }}>Make it public</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>
                Anyone can view this project
              </div>
            </div>
            <button
              onClick={() => setIsPublic(!isPublic)}
              style={{
                position: "relative",
                width: 44,
                height: 24,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                backgroundColor: isPublic ? "#C4622D" : "#E8D9C4",
                transition: "background-color 200ms ease",
                padding: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: isPublic ? 22 : 2,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  transition: "left 200ms ease",
                }}
              />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleCreate} disabled={!name.trim()}>Create Project</Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
