import { useNavigate } from "react-router-dom";
import { useProjects } from "../../store/projectStore";

export default function EditorNavbar() {
  const navigate = useNavigate();
  const { currentProject, activeTab, setActiveTab } = useProjects();
  const tabs = ["tables", "interface", "workflows"];

  const navStyle = {
    height: 56,
    backgroundColor: "#1A0E0A",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    gap: 24,
    flexShrink: 0,
    position: "relative",
  };

  const tabButton = (tab) => {
    const active = activeTab === tab;
    return (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        style={{
          padding: "6px 20px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          backgroundColor: active ? "rgba(212,160,23,0.1)" : "transparent",
          color: active ? "#D4A017" : "#A08060",
          borderBottom: active ? "2px solid #D4A017" : "2px solid transparent",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          transition: "all 150ms ease",
        }}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    );
  };

  const badgeMeta = {
    published: { bg: "#E8F5EC", color: "#1E6B3C" },
    draft: { bg: "#FFF0E8", color: "#A04E22" },
    archived: { bg: "#F0EDE8", color: "#7A5C44" },
  }[currentProject?.status || "draft"] || { bg: "#FFF0E8", color: "#A04E22" };

  return (
    <nav style={navStyle}>
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid #3D2010",
            background: "transparent",
            color: "#A08060",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 150ms ease, border-color 150ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#FFFFFF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#A08060"; e.currentTarget.style.borderColor = "#3D2010"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
            {currentProject?.name || "Project"}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 20,
              backgroundColor: badgeMeta.bg,
              color: badgeMeta.color,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: badgeMeta.color }} />
            {currentProject?.status?.charAt(0).toUpperCase() + currentProject?.status?.slice(1) || "Draft"}
          </div>
        </div>
      </div>

      {/* Center tabs */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
        {tabs.map(tabButton)}
      </div>

      {/* Right actions */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          style={{
            padding: "6px 16px",
            borderRadius: 6,
            border: "1px solid #3D2010",
            background: "transparent",
            color: "#A08060",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A08060"; e.currentTarget.style.color = "#FFFFFF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3D2010"; e.currentTarget.style.color = "#A08060"; }}
        >
          Preview
        </button>
        <button
          style={{
            padding: "6px 16px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#C4622D",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            cursor: "pointer",
            transition: "background-color 150ms ease, transform 150ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#A04E22"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#C4622D"; e.currentTarget.style.transform = "none"; }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        >
          Export
        </button>
      </div>
    </nav>
  );
}
