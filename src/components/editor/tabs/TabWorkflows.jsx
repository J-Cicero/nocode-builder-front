import { useState } from "react";
import Button from "../../common/Button";
import Modal from "../../common/Modal";

const MOCK_WORKFLOWS = [
  { id: "w1", name: "Welcome Email", summary: "When Users is created → Send email", active: true },
  { id: "w2", name: "Low Stock Alert", summary: "When Products is updated → Send notification", active: true },
  { id: "w3", name: "Order Confirmation", summary: "When Orders is created → Send email", active: false },
];

export default function TabWorkflows() {
  const [workflows, setWorkflows] = useState(MOCK_WORKFLOWS);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ table: "", event: "", condition: "", action: "" });

  const toggle = (id) => setWorkflows((w) => w.map((wf) => wf.id === id ? { ...wf, active: !wf.active } : wf));

  const stepperDot = (idx) => {
    const state = idx < step ? "#2D5A1B" : idx === step ? "#C4622D" : "#E8D9C4";
    return (
      <div key={idx} style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: state }} />
        {idx < 3 && <div style={{ width: 28, height: 2, backgroundColor: "#E8D9C4", margin: "0 6px" }} />}
      </div>
    );
  };

  const toggleSwitch = (active) => (
    <button
      style={{
        position: "relative",
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: active ? "#2D5A1B" : "#E8D9C4",
        border: "none",
        cursor: "pointer",
        transition: "background-color 150ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: active ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          transition: "left 150ms ease",
        }}
      />
    </button>
  );

  return (
    <div style={{ flex: 1, padding: 32, overflowY: "auto", backgroundColor: "#FBF4E9" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#2C1A0E" }}>Workflows</h2>
        <Button variant="primary" onClick={() => { setIsOpen(true); setStep(1); }}>+ New Workflow</Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {workflows.map((wf) => (
          <div
            key={wf.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: "20px 24px",
              boxShadow: "0 2px 8px rgba(44,26,14,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "#FFF0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4622D" strokeWidth="2">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#2C1A0E" }}>{wf.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#7A5C44", marginTop: 4 }}>{wf.summary}</div>
            </div>
            {toggleSwitch(wf.active)}
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ border: "1px solid #E8D9C4", background: "transparent", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
                Edit
              </button>
              <button
                style={{ border: "1px solid #E8D9C4", background: "transparent", borderRadius: 6, padding: 6, cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF5F5"; e.currentTarget.style.borderColor = "#B03030"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#E8D9C4"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B03030" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7" strokeLinecap="round" />
                  <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" strokeLinecap="round" />
                  <path d="M4 7h16" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Workflow">
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 24 }}>
          {[1, 2, 3].map((n) => stepperDot(n))}
        </div>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>When this happens...</label>
            <div style={{ display: "flex", gap: 12 }}>
              <select
                value={form.table}
                onChange={(e) => setForm({ ...form, table: e.target.value })}
                style={{ flex: 1, padding: "12px 14px", border: "1.5px solid #E8D9C4", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }}
              >
                <option value="">Select table</option>
                <option value="Users">Users</option>
                <option value="Products">Products</option>
                <option value="Orders">Orders</option>
              </select>
              <select
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                style={{ flex: 1, padding: "12px 14px", border: "1.5px solid #E8D9C4", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }}
              >
                <option value="">Select event</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="deleted">Deleted</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>Only if...</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <select style={{ flex: 1, minWidth: 140, padding: "12px 14px", border: "1.5px solid #E8D9C4", borderRadius: 8 }}>
                <option>Field</option>
                <option>status</option>
                <option>quantity</option>
              </select>
              <select style={{ flex: 1, minWidth: 140, padding: "12px 14px", border: "1.5px solid #E8D9C4", borderRadius: 8 }}>
                <option>equals</option>
                <option>not equals</option>
                <option>contains</option>
                <option>greater than</option>
              </select>
              <input
                style={{ flex: 1, minWidth: 160, padding: "12px 14px", border: "1.5px solid #E8D9C4", borderRadius: 8, fontFamily: "'DM Sans', sans-serif" }}
                placeholder="Value"
              />
            </div>
            <button
              type="button"
              style={{ background: "transparent", border: "none", color: "#C4622D", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" }}
            >
              + Add condition
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A5C44" }}>Then do this...</label>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Send Email", "Send Notification", "Update Field"].map((action) => {
                const active = form.action === action;
                return (
                  <button
                    key={action}
                    type="button"
                    onClick={() => setForm({ ...form, action })}
                    style={{
                      flex: 1,
                      minWidth: 140,
                      padding: 12,
                      borderRadius: 10,
                      border: `2px solid ${active ? "#C4622D" : "#E8D9C4"}`,
                      backgroundColor: active ? "#FFF0E8" : "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      color: "#2C1A0E",
                      cursor: "pointer",
                    }}
                  >
                    {action}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          {step > 1 && <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>Back</Button>}
          {step < 3 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <Button variant="primary" onClick={() => { setIsOpen(false); setStep(1); }}>Save</Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
