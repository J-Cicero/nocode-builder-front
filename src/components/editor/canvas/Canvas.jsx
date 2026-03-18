import { useState } from "react";
import Button from "../../common/Button";

const MOCK_CANVAS_ITEMS = [
  { id: "c1", type: "title", label: "Welcome to My App" },
  { id: "c2", type: "text", label: "This is a beautiful interface" },
  { id: "c3", type: "button", label: "Click Me", color: "#C4622D" },
];

export default function Canvas() {
  const [pages, setPages] = useState(["Page 1", "Page 2"]);
  const [activePage, setActivePage] = useState(0);
  const [canvasItems, setCanvasItems] = useState(MOCK_CANVAS_ITEMS);

  const addPage = () => {
    const newPageName = `Page ${pages.length + 1}`;
    setPages([...pages, newPageName]);
  };

  return (
    <div className="flex-1 bg-bg flex flex-col">
      {/* Pages tabs */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-white">
        {pages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setActivePage(idx)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium font-dm-sans ${
              activePage === idx
                ? "bg-primary text-white"
                : "bg-transparent border border-border text-text-muted hover:border-primary"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={addPage}
          className="px-3 py-2 text-text-muted hover:text-text transition-colors text-sm font-dm-sans"
        >
          + Page
        </button>
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg" style={{ width: "375px", minHeight: "600px" }}>
          {canvasItems.length > 0 ? (
            <div className="p-6 space-y-4">
              {canvasItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-bg rounded-lg border border-border hover:border-primary transition-colors cursor-pointer group"
                >
                  {item.type === "title" && (
                    <h3 className="font-playfair-display font-bold text-lg text-text">
                      {item.label}
                    </h3>
                  )}
                  {item.type === "text" && (
                    <p className="text-text-muted text-sm">{item.label}</p>
                  )}
                  {item.type === "button" && (
                    <button
                      className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.label}
                    </button>
                  )}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="p-1 bg-primary text-white rounded text-xs">✎</button>
                    <button className="p-1 bg-error text-white rounded text-xs">✕</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-text-muted">
              <svg className="w-12 h-12 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-center text-sm">Drag components here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
