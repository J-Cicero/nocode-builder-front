import { useNavigate } from "react-router-dom";
import { useProjects } from "../../store/projectStore";
import Button from "../common/Button";

export default function EditorNavbar() {
  const navigate = useNavigate();
  const { currentProject, activeTab, setActiveTab } = useProjects();

  const tabs = ["tables", "interface", "workflows"];

  return (
    <nav className="h-16 px-6 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/70">
      {/* Left: Back button and project name */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => navigate("/dashboard")}
          className="h-10 w-10 rounded-full border border-border/80 text-text hover:bg-bg transition-all"
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">Éditeur</p>
          <h1 className="text-text font-playfair-display text-lg font-bold">
            {currentProject?.name || "Project"}
          </h1>
        </div>
      </div>

      {/* Center: Tabs */}
      <div className="flex gap-2 bg-white/70 border border-border/80 rounded-full px-2 py-1 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "text-text-muted hover:text-text"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Right: Status badge and buttons */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-3 py-1 bg-primary/15 text-primary rounded-full">
          {currentProject?.status.toUpperCase() || "DRAFT"}
        </span>
        <Button variant="ghost" size="sm" className="text-text">
          Preview
        </Button>
        <Button variant="primary" size="sm">
          Export
        </Button>
      </div>
    </nav>
  );
}
