import { useState } from "react";
import Input from "../../common/Input";

export default function PropertiesPanel() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [properties, setProperties] = useState({
    label: "",
    bgColor: "#FFFFFF",
    textColor: "#2C1A0E"
  });

  const handlePropertyChange = (key, value) => {
    setProperties(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!selectedComponent) {
    return (
      <div className="w-64 border-l border-border bg-white flex items-center justify-center text-text-muted text-sm text-center p-4">
        <p>Select a component to edit</p>
      </div>
    );
  }

  return (
    <div className="w-64 border-l border-border bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4">
        <h3 className="font-bold text-text">Properties</h3>
      </div>

      {/* Properties form */}
      <div className="p-4 space-y-4">
        <Input
          label="Label"
          placeholder="Component label"
          value={properties.label}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
            Background Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={properties.bgColor}
              onChange={(e) => handlePropertyChange("bgColor", e.target.value)}
              className="w-12 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={properties.bgColor}
              onChange={(e) => handlePropertyChange("bgColor", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-border focus:border-primary focus:outline-none font-dm-sans text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
            Text Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={properties.textColor}
              onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              className="w-12 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={properties.textColor}
              onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-border focus:border-primary focus:outline-none font-dm-sans text-sm"
              placeholder="#2C1A0E"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs font-medium text-text-muted mb-2">Preview</p>
          <div
            className="p-4 rounded-lg text-center"
            style={{
              backgroundColor: properties.bgColor,
              color: properties.textColor,
              border: `2px solid ${properties.bgColor}`
            }}
          >
            {properties.label || "Preview"}
          </div>
        </div>
      </div>
    </div>
  );
}
