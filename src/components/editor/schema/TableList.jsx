import Button from "../../common/Button";

const MOCK_TABLES = [
  { id: "t1", name: "Users", fields: 6 },
  { id: "t2", name: "Products", fields: 8 },
  { id: "t3", name: "Orders", fields: 5 },
  { id: "t4", name: "Categories", fields: 3 },
];

export default function TableList({ selectedId, onSelect }) {
  const headerStyle = {
    padding: "20px 16px",
    borderBottom: "1px solid #E8D9C4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  };

  return (
    <div style={{ width: 280, backgroundColor: "#FFFFFF", borderRight: "1px solid #E8D9C4", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#2C1A0E" }}>Tables</h3>
        <Button variant="primary" size="sm">+ New</Button>
      </div>

      <div style={{ overflowY: "auto", flex: 1 }}>
        {MOCK_TABLES.map((table) => {
          const active = selectedId === table.id;
          return (
            <button
              key={table.id}
              onClick={() => onSelect(table)}
              style={{
                width: "100%",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                border: "none",
                borderLeft: active ? "3px solid #C4622D" : "3px solid transparent",
                backgroundColor: active ? "#FFF0E8" : "transparent",
                transition: "background-color 150ms ease, border-color 150ms ease",
              }}
              onMouseEnter={(e) => !active && (e.currentTarget.style.backgroundColor = "#FBF4E9")}
              onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2">
                <path d="M9 3v2m6-2v2M5 9h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" strokeLinecap="round" />
                <path d="M9 11v8M15 11v8M3 7h18" strokeLinecap="round" />
              </svg>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#2C1A0E" }}>{table.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>{table.fields} fields</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
