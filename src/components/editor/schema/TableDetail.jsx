import Button from "../../common/Button";

const MOCK_FIELDS = {
  t1: [
    { id: "f1", name: "id", type: "Number", required: true },
    { id: "f2", name: "name", type: "Text", required: true },
    { id: "f3", name: "email", type: "Email", required: true },
    { id: "f4", name: "phone", type: "Text", required: false },
    { id: "f5", name: "created_at", type: "Date", required: false },
    { id: "f6", name: "role", type: "Text", required: true },
  ],
  t2: [
    { id: "f1", name: "sku", type: "Text", required: true },
    { id: "f2", name: "name", type: "Text", required: true },
    { id: "f3", name: "price", type: "Number", required: true },
    { id: "f4", name: "quantity", type: "Number", required: true },
    { id: "f5", name: "category", type: "Text", required: true },
  ],
  t3: [
    { id: "f1", name: "order_number", type: "Text", required: true },
    { id: "f2", name: "status", type: "Text", required: true },
    { id: "f3", name: "total", type: "Number", required: true },
  ],
  t4: [
    { id: "f1", name: "label", type: "Text", required: true },
    { id: "f2", name: "color", type: "Text", required: false },
  ],
};

const typeStyles = {
  Text: { bg: "#FFF0E8", color: "#A04E22" },
  Number: { bg: "#E8F5EC", color: "#1E6B3C" },
  Email: { bg: "#F0E8FF", color: "#5A2A8B" },
  Date: { bg: "#FBF0E8", color: "#8B5E2A" },
  Checkbox: { bg: "#E8F5EC", color: "#1E6B3C" },
  Select: { bg: "#E8F5FC", color: "#1A5A7A" },
  Link: { bg: "#E8F5FC", color: "#1A5A7A" },
};

export default function TableDetail({ table }) {
  if (!table) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#7A5C44", fontFamily: "'DM Sans', sans-serif" }}>
        Select a table to view its fields
      </div>
    );
  }

  const fields = MOCK_FIELDS[table.id] || [];

  const toggleStyle = (active) => ({
    position: "relative",
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: active ? "#C4622D" : "#E8D9C4",
    border: "none",
    cursor: "pointer",
    transition: "background-color 150ms ease",
  });

  return (
    <div style={{ flex: 1, padding: 32, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#2C1A0E" }}>
          {table.name}
        </h2>
        <Button variant="primary" size="sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Field
        </Button>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#FBF4E9" }}>
              {["Field Name", "Type", "Required", "Actions"].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#7A5C44",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => {
              const t = typeStyles[field.type] || { bg: "#F0EDE8", color: "#7A5C44" };
              return (
                <tr
                  key={field.id}
                  style={{
                    borderBottom: "1px solid #F0E8DC",
                    backgroundColor: idx % 2 ? "#FFFFFF" : "#FFFEFC",
                    transition: "background-color 150ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FBF4E9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 ? "#FFFFFF" : "#FFFEFC")}
                >
                  <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#2C1A0E" }}>
                    {field.name}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: 4,
                        backgroundColor: t.bg,
                        color: t.color,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {field.type}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button style={toggleStyle(field.required)}>
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          left: field.required ? 18 : 2,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: "#FFFFFF",
                          transition: "left 150ms ease",
                        }}
                      />
                    </button>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        style={{ background: "transparent", border: "none", cursor: "pointer", color: "#C4622D", padding: 6 }}
                        aria-label="Edit field"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 21h4l11-11-4-4L4 17v4Z" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M14 7l3 3" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        style={{ background: "transparent", border: "1px solid #E8D9C4", borderRadius: 6, cursor: "pointer", padding: 6 }}
                        aria-label="Delete field"
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF5F5"; e.currentTarget.style.borderColor = "#B03030"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#E8D9C4"; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B03030" strokeWidth="2">
                          <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7" strokeLinecap="round" />
                          <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" strokeLinecap="round" />
                          <path d="M4 7h16" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
