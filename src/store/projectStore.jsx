import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext();

const DEFAULT_PROJECTS = [
  {
    tracking_id: "p1",
    name: "Salon Manager",
    description: "Manage appointments and clients",
    status: "published",
    is_public: false,
    created_at: "2025-01-15",
    config: { theme: { primary_color: "#C4622D" }, pages: [], datasources: [] }
  },
  {
    tracking_id: "p2",
    name: "Inventory App",
    description: "Track products and stock levels",
    status: "draft",
    is_public: false,
    created_at: "2025-02-20",
    config: { theme: { primary_color: "#2D5A1B" }, pages: [], datasources: [] }
  },
  {
    tracking_id: "p3",
    name: "Event Planner",
    description: "Organize community events",
    status: "archived",
    is_public: true,
    created_at: "2025-03-01",
    config: { theme: { primary_color: "#D4A017" }, pages: [], datasources: [] }
  }
];

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [currentProject, setCurrentProject] = useState(null);
  const [activeTab, setActiveTab] = useState("tables");

  // Charger les projets depuis localStorage au montage
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects));
      } catch (error) {
        console.error("Erreur parsing stored projects:", error);
        localStorage.removeItem("projects");
      }
    }
  }, []);

  // Sauvegarder les projets dans localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const createProject = (data) => {
    const newProject = {
      tracking_id: `p-${Date.now()}`,
      name: data.name,
      description: data.description || "Manage your app seamlessly.",
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
