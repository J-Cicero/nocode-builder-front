import { useNavigate } from "react-router-dom";
import { useProjects } from "../../store/projectStore";
import Button from "../common/Button";

export default function EditorNavbar() {
  const navigate = useNavigate();
  const { currentProject, activeTab, setActiveTab } = useProjects();

  const tabs = ["tables", "interface", "workflows"];

  return (
    <nav className="bg-dark h-16 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Back button and project name */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white hover:text-secondary transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-playfair-display text-lg font-bold">
          {currentProject?.name || "Project"}
        </h1>
      </div>

      {/* Center: Tabs */}
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium transition-colors pb-2 border-b-2 ${
              activeTab === tab
                ? "text-white border-secondary"
                : "text-text-muted border-transparent hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Right: Status badge and buttons */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full">
          {currentProject?.status.toUpperCase() || "DRAFT"}
        </span>
        <Button variant="ghost" size="sm" className="text-white hover:text-secondary">
          Preview
        </Button>
        <Button variant="primary" size="sm">
          Export
        </Button>
      </div>
    </nav>
  );
}
