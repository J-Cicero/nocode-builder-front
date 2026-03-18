import ComponentPanel from "../canvas/ComponentPanel";
import Canvas from "../canvas/Canvas";
import PropertiesPanel from "../canvas/PropertiesPanel";

export default function TabInterface() {
  return (
    <div className="flex h-full">
      {/* Left: Components library */}
      <ComponentPanel />

      {/* Center: Canvas */}
      <Canvas />

      {/* Right: Properties */}
      <PropertiesPanel />
    </div>
  );
}
