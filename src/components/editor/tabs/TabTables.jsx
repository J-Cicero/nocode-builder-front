import { useState } from "react";
import TableDetail from "../schema/TableDetail";
import Button from "../../common/Button";

const MOCK_TABLES = [
  { id: "t1", name: "Users", fields: 5 },
  { id: "t2", name: "Products", fields: 8 },
  { id: "t3", name: "Orders", fields: 6 }
];

export default function TabTables() {
  const [selectedTable, setSelectedTable] = useState(MOCK_TABLES[0]);

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-72 border-r border-border bg-white overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-bold text-text">Tables</h3>
          <Button variant="primary" size="sm">
            + New
          </Button>
        </div>

        {/* Tables list */}
        <div className="p-3">
          {MOCK_TABLES.map((table) => (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left mb-2 ${
                selectedTable.id === table.id
                  ? "bg-primary bg-opacity-10 border-l-4 border-primary"
                  : "hover:bg-bg"
              }`}
            >
              <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 5h6m-1 4v10m-4-10v10m-4-10v10M5 9h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text truncate">{table.name}</p>
                <p className="text-xs text-text-muted">{table.fields} fields</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1 bg-bg p-6 overflow-y-auto">
        <TableDetail table={selectedTable} />
      </div>
    </div>
  );
}
