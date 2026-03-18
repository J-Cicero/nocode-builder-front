import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useProjects } from "../store/projectStore";
import { useAuth } from "../store/authStore";
import ProjectCard from "../components/dashboard/ProjectCard";
import NewProjectModal from "../components/dashboard/NewProjectModal";
import Button from "../components/common/Button";

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const firstName = user?.name?.split(" ")[0] || "User";

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.status === activeFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-4xl font-playfair-display font-bold text-text mb-2">
            Good morning, {firstName} 👋
          </h1>
          <p className="text-text-muted">What are you building today?</p>
        </div>

        {/* Create button */}
        <div className="mb-8">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="gap-2"
          >
            <span>+ New Project</span>
          </Button>
        </div>

        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {["all", "draft", "published", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors font-dm-sans text-sm font-medium ${
                  activeFilter === status
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-text-muted hover:border-primary"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans"
            />
          </div>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.tracking_id} project={project} />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-text-muted mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-text-muted font-dm-sans">No projects found matching your search.</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-text-muted mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-text-muted mb-4 font-dm-sans">No projects yet. Create one to get started!</p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Create First Project
            </Button>
          </div>
        )}
      </main>

      {/* Modal */}
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
