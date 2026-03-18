import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

const MOCK_PROJECTS = [
  {
    tracking_id: "proj-001",
    name: "Salon Manager",
    description: "App to manage hair salon appointments",
    status: "published",
    is_public: false,
    created_at: "2025-01-15T10:00:00Z",
    config: { theme: { primary_color: "#C4622D" }, pages: [], datasources: [] }
  },
  {
    tracking_id: "proj-002",
    name: "Market Inventory",
    description: "Track market stock and sales",
    status: "draft",
    is_public: false,
    created_at: "2025-02-20T14:30:00Z",
    config: { theme: { primary_color: "#2D5A1B" }, pages: [], datasources: [] }
  },
  {
    tracking_id: "proj-003",
    name: "School Portal",
    description: "Student and teacher management",
    status: "archived",
    is_public: true,
    created_at: "2025-03-01T09:00:00Z",
    config: { theme: { primary_color: "#D4A017" }, pages: [], datasources: [] }
  }
];

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [currentProject, setCurrentProject] = useState(null);
  const [activeTab, setActiveTab] = useState("tables");

  const createProject = (data) => {
    const newProject = {
      tracking_id: `proj-${Date.now()}`,
      name: data.name,
      description: data.description || "",
      status: "draft",
      is_public: data.is_public || false,
      created_at: new Date().toISOString(),
      config: { theme: { primary_color: "#C4622D" }, pages: [], datasources: [] }
    };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const deleteProject = (tracking_id) => {
    setProjects(projects.filter(p => p.tracking_id !== tracking_id));
    if (currentProject?.tracking_id === tracking_id) {
      setCurrentProject(null);
    }
  };

  const updateProject = (tracking_id, updates) => {
    setProjects(projects.map(p =>
      p.tracking_id === tracking_id ? { ...p, ...updates } : p
    ));
    if (currentProject?.tracking_id === tracking_id) {
      setCurrentProject({ ...currentProject, ...updates });
    }
  };

  const value = {
    projects,
    currentProject,
    activeTab,
    createProject,
    deleteProject,
    updateProject,
    setCurrentProject,
    setActiveTab
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectProvider");
  }
  return context;
}
