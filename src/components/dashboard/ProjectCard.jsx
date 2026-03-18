import { useNavigate } from "react-router-dom";
import { useProjects } from "../../store/projectStore";

const statusColors = {
  draft: { bg: "#FFF0E8", text: "#C4622D", border: "border-l-8 border-primary" },
  published: { bg: "#E8F5E9", text: "#2D5A1B", border: "border-l-8 border-green" },
  archived: { bg: "#F5F0EB", text: "#7A5C44", border: "border-l-8 border-text-muted" }
};

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const { deleteProject, setCurrentProject } = useProjects();

  const handleOpen = () => {
    setCurrentProject(project);
    navigate(`/editor/${project.tracking_id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${project.name}"? This action cannot be undone.`)) {
      deleteProject(project.tracking_id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const colors = statusColors[project.status] || statusColors.draft;
  const firstTwoLetters = project.name.substring(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Top color bar */}
      <div className="h-2" style={{ backgroundColor: colors.text }}></div>

      {/* Content */}
      <div className="p-5">
        {/* Header with avatar and name */}
        <div className="flex gap-4 mb-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: colors.text }}
          >
            {firstTwoLetters}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-playfair-display font-bold text-lg text-text truncate">
              {project.name}
            </h3>
            <p className="text-sm text-text-muted line-clamp-2">
              {project.description || "No description"}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: colors.bg,
              color: colors.text
            }}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        {/* Date */}
        <p className="text-xs text-text-muted mb-4 font-dm-sans">
          Created {formatDate(project.created_at)}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleOpen}
            className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium font-dm-sans"
          >
            Open
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-100 text-error rounded-lg hover:bg-red-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
