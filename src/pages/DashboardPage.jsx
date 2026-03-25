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

  const counts = {
    total: projects.length,
    draft: projects.filter(p => p.status === "draft").length,
    published: projects.filter(p => p.status === "published").length,
    archived: projects.filter(p => p.status === "archived").length,
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.status === activeFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative min-h-screen grain-overlay overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      <Navbar />

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-6 pb-14 pt-10">
        {/* Hero */}
        <section className="grid lg:grid-cols-[1.15fr,0.85fr] gap-6 mb-10">
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-16 -top-10 w-52 h-52 bg-gradient-to-br from-primary/40 to-secondary/30 blur-3xl" />
              <div className="absolute -left-10 bottom-0 w-40 h-40 bg-green/10 blur-3xl" />
            </div>
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-text-muted mb-3">
                Bonjour, {firstName}
              </p>
              <h1 className="text-4xl md:text-[42px] font-playfair-display font-bold text-text leading-tight mb-4">
                Construisons votre prochaine app sans coder
              </h1>
              <p className="text-text-muted max-w-2xl mb-6">
                Assemblez les écrans, les données et les workflows en quelques minutes.
                Nous avons préparé des composants prêts à l'emploi pour vous lancer vite.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="px-6"
                >
                  + Nouveau projet
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setActiveFilter("draft");
                    setSearchTerm("");
                  }}
                >
                  Voir les brouillons
                </Button>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {[
              { label: "Projets", value: counts.total, hint: "actifs" },
              { label: "Brouillons", value: counts.draft, hint: "à finaliser" },
              { label: "En ligne", value: counts.published, hint: "visibles" },
              { label: "Archivés", value: counts.archived, hint: "en sauvegarde" },
            ].map((card) => (
              <div key={card.label} className="glass-panel rounded-2xl p-4 flex flex-col gap-1">
                <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{card.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-playfair-display text-text">{card.value}</span>
                  <span className="text-sm text-text-muted">{card.hint}</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                    style={{ width: `${Math.min(card.value || 0, 8) * 12.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters & search */}
        <div className="glass-panel rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "Tous" },
              { key: "draft", label: "Brouillon" },
              { key: "published", label: "En ligne" },
              { key: "archived", label: "Archive" },
            ].map((status) => (
              <button
                key={status.key}
                onClick={() => setActiveFilter(status.key)}
                className={`px-4 py-2 pill font-dm-sans text-sm font-semibold transition-all ${
                  activeFilter === status.key
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white/70 text-text-muted hover:text-text"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 font-dm-sans shadow-inner"
            />
          </div>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.tracking_id} project={project} />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="glass-panel rounded-3xl p-10 text-center">
            <svg
              className="w-16 h-16 mx-auto text-text-muted mb-4 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-text-muted font-dm-sans">Aucun projet ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-text-muted mb-4 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-text mb-3 font-playfair-display text-xl">Créez votre première app</p>
            <p className="text-text-muted mb-4 font-dm-sans">Lancez un projet et voyez votre interface prendre forme.</p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Démarrer un projet
            </Button>
          </div>
        )}
      </main>

      {/* Modal */}
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
