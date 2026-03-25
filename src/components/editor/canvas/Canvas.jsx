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
    <div className="flex-1 bg-gradient-to-br from-white via-bg to-[#f1e2d2] flex flex-col">
      {/* Pages tabs */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border/80 bg-white/80 backdrop-blur">
        {pages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setActivePage(idx)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activePage === idx
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white border border-border text-text-muted hover:text-text"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={addPage}
          className="px-3 py-2 text-text-muted hover:text-text transition-colors text-sm font-semibold"
        >
          + Page
        </button>
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-primary/12 via-secondary/10 to-green/10 blur-3xl rounded-3xl pointer-events-none" />
          <div className="relative bg-white/90 border border-border/80 rounded-[32px] shadow-2xl shadow-primary/10" style={{ width: "390px", minHeight: "640px" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/70 bg-white/80 rounded-t-[32px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs text-text-muted uppercase tracking-[0.2em]">Aperçu mobile</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-bg text-xs font-semibold text-text">Page {activePage + 1}</span>
            </div>

            {canvasItems.length > 0 ? (
              <div className="p-6 space-y-4">
                {canvasItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative p-4 bg-bg rounded-xl border border-border hover:border-primary transition-colors cursor-pointer group"
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
                        className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.label}
                      </button>
                    )}
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button className="p-1 bg-primary text-white rounded text-xs shadow-sm">✎</button>
                      <button className="p-1 bg-error text-white rounded text-xs shadow-sm">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-text-muted">
                <svg className="w-12 h-12 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-center text-sm">Déposez des composants ici</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
