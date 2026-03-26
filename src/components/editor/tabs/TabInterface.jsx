import ComponentPanel from "../canvas/ComponentPanel";
import Canvas from "../canvas/Canvas";
import PropertiesPanel from "../canvas/PropertiesPanel";

export default function TabInterface() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <ComponentPanel />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}
