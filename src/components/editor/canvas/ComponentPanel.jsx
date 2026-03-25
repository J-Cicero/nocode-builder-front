import { useState } from "react";

const COMPONENTS_LIBRARY = {
  Layout: [
    { id: "container", icon: "☐", name: "Container" },
    { id: "columns", icon: "⋮⋮", name: "Columns" },
    { id: "divider", icon: "—", name: "Divider" }
  ],
  Forms: [
    { id: "text-input", icon: "✎", name: "Text Input" },
    { id: "button", icon: "▢", name: "Button" },
    { id: "dropdown", icon: "▼", name: "Dropdown" },
    { id: "checkbox", icon: "☑", name: "Checkbox" }
  ],
  Display: [
    { id: "title", icon: "T", name: "Title" },
    { id: "text", icon: "¶", name: "Text" },
    { id: "image", icon: "📷", name: "Image" },
    { id: "data-list", icon: "≡", name: "Data List" }
  ]
};

export default function ComponentPanel() {
  const [expandedSections, setExpandedSections] = useState({
    Layout: true,
    Forms: true,
    Display: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 border-r border-border/70 bg-white/85 backdrop-blur-md overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 border-b border-border/70 p-4">
        <h3 className="font-bold text-text text-lg">Bibliothèque</h3>
        <p className="text-xs text-text-muted">Glissez vos blocs préférés</p>
      </div>

      {/* Sections */}
      <div>
        {Object.entries(COMPONENTS_LIBRARY).map(([section, components]) => (
          <div key={section} className="border-b border-border/70">
            {/* Section header */}
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg/70 transition-colors text-left"
            >
              <span className="font-semibold text-text">{section}</span>
              <svg
                className={`w-4 h-4 text-text-muted transition-transform ${
                  expandedSections[section] ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Components */}
            {expandedSections[section] && (
              <div className="px-2 pb-3">
                {components.map((comp) => (
                  <div
                    key={comp.id}
                    draggable
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-bg transition-all mx-1 border border-transparent hover:border-border"
                  >
                    <span className="text-xl">{comp.icon}</span>
                    <span className="text-sm text-text font-semibold">{comp.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
