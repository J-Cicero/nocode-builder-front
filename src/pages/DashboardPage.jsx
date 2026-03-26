import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/dashboard/ProjectCard";
import NewProjectModal from "../components/dashboard/NewProjectModal";
import Button from "../components/common/Button";
import { useProjects } from "../store/projectStore";
import { useAuth } from "../store/authStore";

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects, createProject, deleteProject, loading, error } = useProjects();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" ? true : p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: projects.length,
    draft: projects.filter((p) => p.status === "draft").length,
    published: projects.filter((p) => p.status === "published").length,
    archived: projects.filter((p) => p.status === "archived").length,
  };

  const handleCreate = async (data) => {
    await createProject({
      name: data.name,
      description: data.description || "Manage your app seamlessly.",
      is_public: data.is_public,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FBF4E9",
    animation: "pageIn 400ms ease",
  };

  const heroStyle = {
    padding: "48px 32px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const filtersRow = {
    padding: "0 32px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  };

  const filterButton = (key, label) => {
    const active = filter === key;
    return (
      <button
        key={key}
        onClick={() => setFilter(key)}
        style={{
          padding: "8px 16px",
          borderRadius: 20,
          border: `1.5px solid ${active ? "#C4622D" : "#E8D9C4"}`,
          backgroundColor: active ? "#C4622D" : "#FFFFFF",
          color: active ? "#FFFFFF" : "#7A5C44",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          cursor: "pointer",
          transition: "all 150ms ease",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.borderColor = "#C4622D";
            e.currentTarget.style.color = "#C4622D";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.borderColor = "#E8D9C4";
            e.currentTarget.style.color = "#7A5C44";
          }
        }}
      >
        {label}
      </button>
    );
  };

  const searchInput = (
    <div style={{ position: "relative" }}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7A5C44"
        strokeWidth="2"
        style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16l4 4" strokeLinecap="round" />
      </svg>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects..."
        style={{
          padding: "8px 16px 8px 38px",
          border: "1.5px solid #E8D9C4",
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          outline: "none",
          width: 240,
          transition: "border 200ms ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4622D")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8D9C4")}
      />
    </div>
  );

  const emptyState = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 32px",
        gap: 16,
      }}
    >
      <div style={{ width: 200, height: 200 }}>
        <svg viewBox="0 0 200 200" width="200" height="200" fill="none">
          <rect x="30" y="40" width="140" height="120" rx="12" fill="#FFF0E8" stroke="#E8D9C4" strokeWidth="2" />
          <path d="M50 110h60M50 90h80M50 130h40" stroke="#C4622D" strokeWidth="4" strokeLinecap="round" />
          <circle cx="140" cy="80" r="14" fill="#D4A017" opacity="0.7" />
          <path d="M120 140l20 10 20-30" stroke="#2D5A1B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#2C1A0E" }}>No projects yet</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#7A5C44" }}>
        Start building your first application
      </div>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>Create your first app</Button>
    </div>
  );

  return (
    <div style={pageStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes pageIn { from { opacity:0; transform: translateY(20px);} to { opacity:1; transform: translateY(0);} }
      `}</style>

      <Navbar />

      <section style={heroStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <h1 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#2C1A0E" }}>
            {greeting}, {user?.name?.split(" ")[0] || "builder"} 👋
          </h1>
          <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7A5C44" }}>
            What are you building today?
          </p>
          <div style={{ marginTop: 16 }}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)} size="md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              New Project
            </Button>
          </div>
        </div>
      </section>

      <section style={filtersRow}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filterButton("all", `All (${counts.total})`)}
          {filterButton("draft", `Draft (${counts.draft})`)}
          {filterButton("published", `Published (${counts.published})`)}
          {filterButton("archived", `Archived (${counts.archived})`)}
        </div>
        {searchInput}
      </section>

      <section
        style={{
          padding: "0 32px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          flex: 1,
        }}
      >
        {filteredProjects.length === 0 ? (
          <div style={{ gridColumn: "1 / -1" }}>{emptyState}</div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.tracking_id}
              project={project}
              onDelete={(id) => deleteProject(id)}
            />
          ))
        )}
      </section>

      {loading && (
        <div style={{ padding: 16, color: "#7A5C44", fontFamily: "'DM Sans', sans-serif" }}>
          Loading projects...
        </div>
      )}
      {error && (
        <div style={{ padding: 16, color: "#B03030", fontFamily: "'DM Sans', sans-serif" }}>
          {error}
        </div>
      )}

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
