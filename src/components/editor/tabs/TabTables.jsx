import { useState } from "react";
import TableList from "../schema/TableList";
import TableDetail from "../schema/TableDetail";

export default function TabTables() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <TableList selectedId={selected?.id} onSelect={setSelected} />
      <div style={{ flex: 1, backgroundColor: "#FBF4E9", display: "flex", flexDirection: "column" }}>
        <TableDetail table={selected} />
      </div>
    </div>
  );
}
