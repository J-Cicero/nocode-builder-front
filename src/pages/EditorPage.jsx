import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../store/projectStore";
import { useEffect } from "react";
import EditorNavbar from "../components/editor/EditorNavbar";
import TabTables from "../components/editor/tabs/TabTables";
import TabInterface from "../components/editor/tabs/TabInterface";
import TabWorkflows from "../components/editor/tabs/TabWorkflows";

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, setCurrentProject, activeTab } = useProjects();

  // Find and set the current project
  useEffect(() => {
    const project = projects.find(p => p.tracking_id === id);
    if (project) {
      setCurrentProject(project);
    } else {
      // Project not found, redirect to dashboard
      navigate("/dashboard");
    }
  }, [id, projects, setCurrentProject, navigate]);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <EditorNavbar />

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "tables" && <TabTables />}
        {activeTab === "interface" && <TabInterface />}
        {activeTab === "workflows" && <TabWorkflows />}
      </div>
    </div>
  );
}
