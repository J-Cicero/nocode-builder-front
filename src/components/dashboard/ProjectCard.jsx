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
    <div className="glass-panel rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-inner"
            style={{ backgroundColor: colors.text }}
          >
            {firstTwoLetters}
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">#{project.tracking_id}</p>
            <h3 className="font-playfair-display font-bold text-lg text-text truncate">
              {project.name}
            </h3>
            <p className="text-sm text-text-muted line-clamp-2">
              {project.description || "Aucune description pour le moment."}
            </p>
          </div>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: colors.bg,
            color: colors.text
          }}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted mb-4">
        <p>Créé le {formatDate(project.created_at)}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.text }} />
          <span className="font-medium">Statut</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleOpen}
          className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/30 hover:shadow-lg"
        >
          Ouvrir
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-2 rounded-lg border border-red-200 text-error hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
