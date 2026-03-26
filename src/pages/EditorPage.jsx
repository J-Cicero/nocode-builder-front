import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../store/projectStore";
import { useEffect } from "react";
import EditorNavbar from "../components/editor/EditorNavbar";
import TabTables from "../components/editor/tabs/TabTables";
import TabInterface from "../components/editor/tabs/TabInterface";
import TabWorkflows from "../components/editor/tabs/TabWorkflows";
import Loader from "../components/common/Loader";

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, setCurrentProject, activeTab } = useProjects();

  // Find and set the current project
  useEffect(() => {
    if (projects && projects.length > 0) {
      const project = projects.find(p => p.tracking_id === id);
      if (project) {
        setCurrentProject(project);
      } else {
        // Project not found, redirect to dashboard
        navigate("/dashboard");
      }
    }
  }, [id, projects, setCurrentProject, navigate]);

  if (!currentProject || !projects.find(p => p.tracking_id === id)) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(135deg, #FFFFFF, #FBF4E9, #f1e2d2)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <Loader size={50} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C44" }}>Chargement du projet...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "#FBF4E9" }}>
      <EditorNavbar />
      <div style={{ flex: 1, overflow: "hidden" }}>
        {activeTab === "tables" && <TabTables />}
        {activeTab === "interface" && <TabInterface />}
        {activeTab === "workflows" && <TabWorkflows />}
      </div>
    </div>
  );
}
