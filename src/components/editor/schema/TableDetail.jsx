import Button from "../../common/Button";

const MOCK_FIELDS = {
  t1: [
    { id: "f1", name: "email", type: "Email", required: true },
    { id: "f2", name: "full_name", type: "Text", required: true },
    { id: "f3", name: "created_at", type: "Date", required: false },
    { id: "f4", name: "phone", type: "Text", required: false },
    { id: "f5", name: "status", type: "Select", required: false }
  ],
  t2: [
    { id: "f1", name: "sku", type: "Text", required: true },
    { id: "f2", name: "name", type: "Text", required: true },
    { id: "f3", name: "price", type: "Number", required: true },
    { id: "f4", name: "quantity", type: "Number", required: true },
    { id: "f5", name: "category", type: "Select", required: true },
    { id: "f6", name: "description", type: "LongText", required: false },
    { id: "f7", name: "image_url", type: "Link", required: false },
    { id: "f8", name: "in_stock", type: "Checkbox", required: false }
  ],
  t3: [
    { id: "f1", name: "order_number", type: "Text", required: true },
    { id: "f2", name: "customer_id", type: "Link", required: true },
    { id: "f3", name: "product_id", type: "Link", required: true },
    { id: "f4", name: "quantity", type: "Number", required: true },
    { id: "f5", name: "total_price", type: "Number", required: true },
    { id: "f6", name: "status", type: "Select", required: true }
  ]
};

const typeColors = {
  Email: "#D4A017",
  Text: "#C4622D",
  Number: "#2D5A1B",
  Date: "#7A5C44",
  Select: "#1A0E0A",
  LongText: "#C4622D",
  Link: "#D4A017",
  Checkbox: "#2D5A1B"
};

export default function TableDetail({ table }) {
  if (!table) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted">
        <p>Select a table to view its fields</p>
      </div>
    );
  }

  const fields = MOCK_FIELDS[table.id] || [];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-playfair-display font-bold text-text">
          {table.name}
        </h3>
        <Button variant="primary" size="sm">
          + Add Field
        </Button>
      </div>

      {/* Fields table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-text-muted">Field Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-muted">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-muted">Required</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.id} className="border-b border-border hover:bg-bg transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-text">{field.name}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: typeColors[field.type] || "#7A5C44" }}
                  >
                    {field.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      field.required ? "bg-primary" : "bg-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        field.required ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button className="text-primary hover:text-primary-dark transition-colors p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-error hover:text-red-700 transition-colors p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
