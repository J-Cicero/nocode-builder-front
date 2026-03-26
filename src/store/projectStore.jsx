import { createContext, useContext, useState, useEffect } from "react";
import projectsApi from "../api/projectsApi";
import { useAuth } from "./authStore";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [activeTab, setActiveTab] = useState("tables");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const { data } = await projectsApi.getAll();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err?.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const createProject = async (data) => {
    const payload = {
      name: data.name,
      description: data.description || null,
      is_public: data.is_public || false,
    };
    const { data: created } = await projectsApi.create(payload);
    setProjects((prev) => [...prev, created]);
    return created;
  };

  const deleteProject = async (tracking_id) => {
    await projectsApi.delete(tracking_id);
    setProjects((prev) => prev.filter((p) => p.tracking_id !== tracking_id));
    if (currentProject?.tracking_id === tracking_id) {
      setCurrentProject(null);
    }
  };

  const updateProject = async (tracking_id, updates) => {
    const { data } = await projectsApi.update(tracking_id, updates);
    setProjects((prev) =>
      prev.map((p) => (p.tracking_id === tracking_id ? data : p))
    );
    if (currentProject?.tracking_id === tracking_id) {
      setCurrentProject(data);
    }
    return data;
  };

  const value = {
    projects,
    currentProject,
    activeTab,
    loading,
    error,
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
