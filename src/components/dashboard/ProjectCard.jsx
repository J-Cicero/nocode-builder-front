import { useNavigate } from "react-router-dom";

const statusMeta = {
  published: { bar: "#2D5A1B", badgeBg: "#E8F5EC", badgeText: "#1E6B3C", dot: "#1E6B3C" },
  draft: { bar: "#C4622D", badgeBg: "#FFF0E8", badgeText: "#A04E22", dot: "#C4622D" },
  archived: { bar: "#7A5C44", badgeBg: "#F0EDE8", badgeText: "#7A5C44", dot: "#7A5C44" },
};

const palette = ["#FFF0E8", "#E8F5EC", "#FBF4E9", "#FFF8E8"];

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  const meta = statusMeta[project.status] || statusMeta.draft;
  const bg = palette[project.name.length % palette.length];
  const initials = project.name.slice(0, 2).toUpperCase();

  const cardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(44,26,14,0.08)",
    cursor: "pointer",
    transition: "transform 200ms ease, box-shadow 200ms ease",
  };

  const openEditor = (e) => {
    e.stopPropagation();
    navigate(`/editor/${project.tracking_id}`);
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(44,26,14,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(44,26,14,0.08)";
      }}
    >
      <div style={{ height: 6, backgroundColor: meta.bar }} />
      <div style={{ padding: 20 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#C4622D",
          }}
        >
          {initials}
        </div>
        <div style={{ marginTop: 12, marginBottom: 4, fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#2C1A0E" }}>
          {project.name}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#7A5C44",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </div>
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 20,
            backgroundColor: meta.badgeBg,
            color: meta.badgeText,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: meta.dot }} />
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </div>
        <div style={{ marginTop: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#B09070" }}>
          Created {new Date(project.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #F0E8DC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={openEditor}
          style={{
            backgroundColor: "#C4622D",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 6,
            padding: "6px 16px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#A04E22";
            e.stopPropagation();
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#C4622D";
            e.stopPropagation();
          }}
        >
          Open Editor
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(project.tracking_id);
          }}
          style={{
            background: "transparent",
            border: "1px solid #E8D9C4",
            padding: "6px 10px",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FFF5F5";
            e.currentTarget.style.borderColor = "#B03030";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "#E8D9C4";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B03030" strokeWidth="2">
            <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7" strokeLinecap="round" />
            <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" strokeLinecap="round" />
            <path d="M4 7h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
