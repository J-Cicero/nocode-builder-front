import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function EditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ─────────────────────────── STATE ───────────────────────────
  const [activeTab, setActiveTab] = useState("interface");
  const [pages, setPages] = useState(["Home", "Products"]);
  const [activePage, setActivePage] = useState(0);
  const initialComponents = [
    [
      { id: "1", type: "title", props: { text: "Welcome to my app" } },
      {
        id: "2",
        type: "text",
        props: { text: "Drag components to build your page." },
      },
      {
        id: "3",
        type: "button",
        props: { label: "Get Started", color: "#C4622D", variant: "filled" },
      },
    ],
    [],
  ];
  const [canvasComponents, setCanvasComponents] = useState(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [device, setDevice] = useState("mobile");
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      text: "Hi! I am your AI assistant for this project. Ask me anything about building your app — data structure, components, workflows, or best practices.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [selectedTable, setSelectedTable] = useState("Users");
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(1);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  const project = {
    tracking_id: id || "p-demo",
    name: "Inventory App",
    status: "draft",
  };

  // ──────────────────────── RESPONSIVE ────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1100;
      setIsMobileLayout(isMobile);
      setShowLeftPanel(!isMobile ? true : false);
      setShowRightPanel(!isMobile ? true : false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ────────────────────────── MOCK DATA ─────────────────────────
  const mockTables = {
    Users: [
      {
        id: 1,
        name: "id",
        type: "UUID",
        required: true,
        default: "uuid_generate_v4()",
      },
      { id: 2, name: "name", type: "Text", required: true, default: "" },
      { id: 3, name: "email", type: "Email", required: true, default: "" },
      { id: 4, name: "phone", type: "Text", required: false, default: "" },
      { id: 5, name: "role", type: "Text", required: true, default: "user" },
      { id: 6, name: "created_at", type: "Date", required: true, default: "now()" },
    ],
    Products: [
      {
        id: 1,
        name: "id",
        type: "UUID",
        required: true,
        default: "uuid_generate_v4()",
      },
      { id: 2, name: "name", type: "Text", required: true, default: "" },
      { id: 3, name: "price", type: "Number", required: true, default: "0" },
      { id: 4, name: "stock", type: "Number", required: true, default: "0" },
      { id: 5, name: "category", type: "Text", required: false, default: "" },
      { id: 6, name: "image_url", type: "Text", required: false, default: "" },
      { id: 7, name: "description", type: "Text", required: false, default: "" },
      { id: 8, name: "created_at", type: "Date", required: true, default: "now()" },
    ],
    Orders: [
      {
        id: 1,
        name: "id",
        type: "UUID",
        required: true,
        default: "uuid_generate_v4()",
      },
      { id: 2, name: "user_id", type: "UUID", required: true, default: "" },
      { id: 3, name: "total", type: "Number", required: true, default: "0" },
      { id: 4, name: "status", type: "Text", required: true, default: "pending" },
      { id: 5, name: "created_at", type: "Date", required: true, default: "now()" },
    ],
    Categories: [
      {
        id: 1,
        name: "id",
        type: "UUID",
        required: true,
        default: "uuid_generate_v4()",
      },
      { id: 2, name: "name", type: "Text", required: true, default: "" },
      { id: 3, name: "description", type: "Text", required: false, default: "" },
    ],
  };

  const workflows = [
    {
      name: "Welcome Email",
      summary: "When Users is created → Send email",
      active: true,
    },
    {
      name: "Low Stock Alert",
      summary: "When Products is updated → Send notification",
      active: true,
    },
    {
      name: "Order Confirmation",
      summary: "When Orders is created → Send email",
      active: false,
    },
  ];

  // ──────────────────────── DND SENSORS ────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  // ───────────────────────── HELPERS ───────────────────────────
  const componentDefaults = {
    title: { text: "Page Title", fontSize: 24, color: "#2C1A0E" },
    text: {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      color: "#7A5C44",
      fontSize: 14,
    },
    button: {
      label: "Click me",
      color: "#C4622D",
      textColor: "#FFFFFF",
      size: "medium",
      variant: "filled",
      fullWidth: false,
    },
    input: { label: "Field Label", placeholder: "Enter text", required: false },
    textarea: {
      label: "Text Area",
      placeholder: "Type here",
      required: false,
      helper: "",
    },
    dropdown: { label: "Select Option", placeholder: "Choose", required: false },
    checkbox: { label: "Checkbox label", required: false },
    image: {
      url: "",
      alt: "Placeholder",
      fit: "cover",
    },
    dataList: {
      table: "Users",
      columns: ["name", "email", "role"],
      perPage: 5,
      pagination: true,
    },
    card: { title: "Card Title", text: "Card description" },
    divider: {},
    spacer: { height: 24 },
    badge: { text: "Badge", color: "#D4A017" },
    barChart: {},
    lineChart: {},
    pieChart: {},
  };

  const palette = [
    {
      title: "Layout",
      key: "layout",
      items: [
        { type: "container", label: "Container", icon: IconBox },
        { type: "columns", label: "Columns", icon: IconColumns },
        { type: "divider", label: "Divider", icon: IconDivider },
        { type: "spacer", label: "Spacer", icon: IconSpacer },
      ],
    },
    {
      title: "Forms",
      key: "forms",
      items: [
        { type: "input", label: "Text Input", icon: IconInput },
        { type: "button", label: "Button", icon: IconButton },
        { type: "dropdown", label: "Dropdown", icon: IconDropdown },
        { type: "checkbox", label: "Checkbox", icon: IconCheckbox },
        { type: "textarea", label: "Text Area", icon: IconTextarea },
        { type: "file", label: "File Upload", icon: IconUpload },
      ],
    },
    {
      title: "Display",
      key: "display",
      items: [
        { type: "title", label: "Title", icon: IconTitle },
        { type: "text", label: "Text", icon: IconText },
        { type: "image", label: "Image", icon: IconImage },
        { type: "dataList", label: "Data List", icon: IconTable },
        { type: "card", label: "Card", icon: IconCard },
        { type: "badge", label: "Badge", icon: IconBadge },
      ],
    },
    {
      title: "Charts",
      key: "charts",
      items: [
        { type: "barChart", label: "Bar Chart", icon: IconBar },
        { type: "lineChart", label: "Line Chart", icon: IconLine },
        { type: "pieChart", label: "Pie Chart", icon: IconPie },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState({
    layout: true,
    forms: true,
    display: true,
    charts: true,
  });

  // ──────────────────────── DND HANDLERS ───────────────────────
  const handleDragStart = () => {};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current || {};
    const overId = over.id;

    // Palette drop onto canvas
    if (activeData.fromPalette && overId === "canvas") {
      const newComponent = {
        id: Date.now().toString(),
        type: activeData.type,
        props: componentDefaults[activeData.type] || {},
      };
      setCanvasComponents((prev) => {
        const copy = [...prev];
        copy[activePage] = [...(copy[activePage] || []), newComponent];
        return copy;
      });
      setSelectedComponent({ page: activePage, id: newComponent.id });
      return;
    }

    // Sortable reorder within canvas
    if (!activeData.fromPalette && overId && overId !== active.id) {
      setCanvasComponents((prev) => {
        const copy = [...prev];
        const currentList = [...(copy[activePage] || [])];
        const oldIndex = currentList.findIndex((c) => c.id === active.id);
        const newIndex = currentList.findIndex((c) => c.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        copy[activePage] = arrayMove(currentList, oldIndex, newIndex);
        return copy;
      });
    }
  };

  // ───────────────────────── CHAT LOGIC ─────────────────────────
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isAiTyping]);

  const aiResponses = [
    {
      keyword: "table",
      text: "I can help you design your data tables! What kind of data do you want to store? For example, if you're building a booking app, you might need a Reservations table with fields like date, time, client_name, and status.",
    },
    {
      keyword: "button",
      text: "Great choice! Buttons are key for user actions. I suggest using the primary color #C4622D for main CTAs, and outlined style for secondary actions. Want me to suggest a button layout for your current page?",
    },
    {
      keyword: "form",
      text: "For forms, best practice is to group related fields together, use clear labels above each input, and always include a submit button with a loading state. What data will your form collect?",
    },
  ];

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const message = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: message }]);
    setChatInput("");
    setIsAiTyping(true);
    setTimeout(() => {
      const lower = message.toLowerCase();
      const match =
        aiResponses.find((r) => lower.includes(r.keyword)) ||
        {
          text: "I'm here to help you build your app! You can ask me about: designing your data structure, choosing the right components, best practices for your interface, or how to set up workflows.",
        };
      setChatMessages((prev) => [...prev, { role: "ai", text: match.text }]);
      setIsAiTyping(false);
    }, 1000);
  };

  // ───────────────────── COMPONENT HELPERS ──────────────────────
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const removeComponent = (id) => {
    setCanvasComponents((prev) => {
      const copy = [...prev];
      copy[activePage] = (copy[activePage] || []).filter((c) => c.id !== id);
      return copy;
    });
    setSelectedComponent(null);
  };

  const duplicateComponent = (id) => {
    setCanvasComponents((prev) => {
      const copy = [...prev];
      const list = copy[activePage] || [];
      const idx = list.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const dup = { ...list[idx], id: Date.now().toString() };
      copy[activePage] = [...list.slice(0, idx + 1), dup, ...list.slice(idx + 1)];
      return copy;
    });
  };

  const moveComponent = (id, direction) => {
    setCanvasComponents((prev) => {
      const copy = [...prev];
      const list = [...(copy[activePage] || [])];
      const idx = list.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const newIndex = direction === "up" ? idx - 1 : idx + 1;
      if (newIndex < 0 || newIndex >= list.length) return prev;
      copy[activePage] = arrayMove(list, idx, newIndex);
      return copy;
    });
  };

  const updateComponentProps = (id, updater) => {
    setCanvasComponents((prev) => {
      const copy = [...prev];
      copy[activePage] = (copy[activePage] || []).map((c) =>
        c.id === id ? { ...c, props: { ...c.props, ...updater } } : c
      );
      return copy;
    });
  };

  const addPage = () => {
    const newName = `Page ${pages.length + 1}`;
    setPages((prev) => [...prev, newName]);
    setCanvasComponents((prev) => [...prev, []]);
    setActivePage(pages.length);
  };

  const deletePage = (index) => {
    if (pages.length <= 1) return;
    setPages((prev) => prev.filter((_, i) => i !== index));
    setCanvasComponents((prev) => prev.filter((_, i) => i !== index));
    if (activePage >= pages.length - 1) setActivePage(pages.length - 2);
    setSelectedComponent(null);
  };

  const frameWidth = device === "mobile" ? 375 : device === "tablet" ? 768 : "100%";

  const selectedInPage =
    selectedComponent &&
    selectedComponent.page === activePage &&
    (canvasComponents[activePage] || []).some((c) => c.id === selectedComponent.id);

  // ───────────────────────── RENDER ─────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FBF4E9",
        color: "#2C1A0E",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <EditorNavbar
        project={project}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== "interface") {
            setSelectedComponent(null);
          }
        }}
        toggleAi={() => setAiPanelOpen((p) => !p)}
        aiOpen={aiPanelOpen}
        onBack={() => navigate("/dashboard")}
      />

      <div style={{ display: "flex", gap: 8, padding: isMobileLayout ? "8px 12px" : 0 }}>
        {isMobileLayout && (
          <>
            <TogglePill
              label="Components"
              active={showLeftPanel}
              onClick={() => setShowLeftPanel((p) => !p)}
            />
            <TogglePill
              label="Properties"
              active={showRightPanel}
              onClick={() => setShowRightPanel((p) => !p)}
            />
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {activeTab === "interface" && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {showLeftPanel && (
              <LeftPanel
                palette={palette}
                openSections={openSections}
                toggleSection={toggleSection}
                isMobile={isMobileLayout}
              />
            )}

            <div
              style={{
                flex: 1,
                backgroundColor: "#E8DDD0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 24,
                overflow: "auto",
                position: "relative",
              }}
            >
              <PagesBar
                pages={pages}
                activePage={activePage}
                setActivePage={(index) => {
                  setActivePage(index);
                  setSelectedComponent(null);
                }}
                deletePage={deletePage}
                addPage={addPage}
              />

              <DeviceToggle device={device} setDevice={setDevice} />

              <CanvasArea
                frameWidth={frameWidth}
                components={canvasComponents[activePage] || []}
                selectedId={selectedInPage ? selectedComponent.id : null}
                onSelect={(id) => setSelectedComponent({ page: activePage, id })}
                onDelete={removeComponent}
                onDuplicate={duplicateComponent}
                onMove={moveComponent}
              />
            </div>

            {showRightPanel && (
              <PropertiesPanel
                component={
                  selectedInPage
                    ? (canvasComponents[activePage] || []).find(
                        (c) => c.id === selectedComponent.id
                      )
                    : null
                }
                updateProps={(updater) =>
                  selectedInPage &&
                  updateComponentProps(selectedComponent.id, updater)
                }
              />
            )}
          </DndContext>
        )}

        {activeTab === "tables" && (
          <TablesTab
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            mockTables={mockTables}
          />
        )}

        {activeTab === "workflows" && (
          <WorkflowsTab
            workflows={workflows}
            openModal={() => setWorkflowModalOpen(true)}
          />
        )}

        <AiChatPanel
          open={aiPanelOpen}
          onClose={() => setAiPanelOpen(false)}
          projectName={project.name}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          sendMessage={sendMessage}
          isTyping={isAiTyping}
          chatEndRef={chatEndRef}
        />
      </div>

      {workflowModalOpen && (
        <WorkflowModal
          step={workflowStep}
          setStep={setWorkflowStep}
          onClose={() => {
            setWorkflowModalOpen(false);
            setWorkflowStep(1);
          }}
        />
      )}
    </div>
  );
}

// ───────────────────────── SUB COMPONENTS ─────────────────────────
function EditorNavbar({ project, activeTab, setActiveTab, toggleAi, aiOpen, onBack }) {
  const tabs = [
    { key: "tables", label: "Tables" },
    { key: "interface", label: "Interface" },
    { key: "workflows", label: "Workflows" },
  ];
  const statusColor =
    project.status === "published"
      ? "#2D5A1B"
      : project.status === "archived"
      ? "#7A5C44"
      : "#C4622D";

  return (
    <div
      style={{
        height: 56,
        backgroundColor: "#1A0E0A",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "relative",
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
        }}
      >
        <IconBack color="#FFFFFF" />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "#FFFFFF",
          }}
        >
          {project.name}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#FFFFFF",
            backgroundColor: statusColor,
            borderRadius: 10,
            padding: "4px 8px",
            textTransform: "capitalize",
          }}
        >
          {project.status}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 16,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: activeTab === tab.key ? "#D4A017" : "#A08060",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              padding: "10px 0",
              borderBottom:
                activeTab === tab.key ? "2px solid #D4A017" : "2px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={toggleAi}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "1px solid #3D2010",
            color: "#A08060",
            fontFamily: "'DM Sans', sans-serif",
            padding: "8px 12px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          <IconBrain color="#D4A017" />
          AI Assistant
          <span
            style={{
              width: 8,
              height: 8,
              backgroundColor: aiOpen ? "#2D5A1B" : "#7A5C44",
              borderRadius: "50%",
            }}
          />
        </button>
        <button
          style={{
            background: "none",
            border: "1px solid #3D2010",
            color: "#A08060",
            fontFamily: "'DM Sans', sans-serif",
            padding: "8px 12px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Preview
        </button>
        <button
          style={{
            backgroundColor: "#C4622D",
            border: "1px solid #C4622D",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            padding: "8px 14px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Export
        </button>
      </div>
    </div>
  );
}

function TogglePill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: 20,
        border: "1px solid #E8D9C4",
        backgroundColor: active ? "#C4622D" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#7A5C44",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function LeftPanel({ palette, openSections, toggleSection, isMobile }) {
  return (
    <div
      style={{
        width: 220,
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #E8D9C4",
        overflowY: "auto",
        transition: "transform 200ms ease",
        transform: isMobile ? "translateX(0)" : "translateX(0)",
      }}
    >
      <div
        style={{
          padding: 16,
          borderBottom: "1px solid #E8D9C4",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: "#2C1A0E",
        }}
      >
        Components
      </div>
      {palette.map((section) => (
        <div key={section.key}>
          <div
            onClick={() => toggleSection(section.key)}
            style={{
              padding: "10px 16px",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#7A5C44",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {section.title}
            <div
              style={{
                transition: "transform 200ms ease",
                transform: openSections[section.key] ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <IconChevron color="#7A5C44" />
            </div>
          </div>
          {openSections[section.key] && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 8,
                padding: "8px 16px",
              }}
            >
              {section.items.map((item) => (
                <PaletteTile key={item.type} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PaletteTile({ item }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${item.type}`,
    data: { fromPalette: true, type: item.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        backgroundColor: "#FBF4E9",
        border: "1px solid #E8D9C4",
        borderRadius: 8,
        padding: "10px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: isDragging ? "grabbing" : "grab",
        transition: "all 150ms",
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <item.icon color="#C4622D" />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: "#2C1A0E",
          textAlign: "center",
        }}
      >
        {item.label}
      </span>
    </div>
  );
}

function PagesBar({ pages, activePage, setActivePage, deletePage, addPage }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 20,
        alignSelf: "stretch",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {pages.map((page, index) => (
        <div
          key={page + index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 20,
            backgroundColor: activePage === index ? "#C4622D" : "#FFFFFF",
            color: activePage === index ? "#FFFFFF" : "#7A5C44",
            border: activePage === index ? "none" : "1px solid #E8D9C4",
            cursor: "pointer",
          }}
          onClick={() => setActivePage(index)}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{page}</span>
          {pages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (index !== pages.length - 1 || pages.length === 1) deletePage(index);
                else deletePage(index);
              }}
              style={{
                background: "none",
                border: "none",
                color: activePage === index ? "#FFFFFF" : "#7A5C44",
                cursor: "pointer",
              }}
            >
              <IconClose color={activePage === index ? "#FFFFFF" : "#7A5C44"} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addPage}
        style={{
          padding: "6px 12px",
          borderRadius: 20,
          border: "1px dashed #E8D9C4",
          color: "#7A5C44",
          backgroundColor: "#FFFFFF",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        + Add Page
      </button>
    </div>
  );
}

function DeviceToggle({ device, setDevice }) {
  const buttons = [
    { key: "mobile", label: "Mobile (375px)" },
    { key: "tablet", label: "Tablet (768px)" },
    { key: "desktop", label: "Desktop (100%)" },
  ];
  return (
    <div style={{ alignSelf: "flex-end", marginBottom: 12, display: "flex", gap: 8 }}>
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => setDevice(btn.key)}
          style={{
            padding: "6px 12px",
            borderRadius: 12,
            backgroundColor: device === btn.key ? "#1A0E0A" : "#FFFFFF",
            color: device === btn.key ? "#FFFFFF" : "#7A5C44",
            border: device === btn.key ? "1px solid #1A0E0A" : "1px solid #E8D9C4",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

function CanvasArea({
  frameWidth,
  components,
  selectedId,
  onSelect,
  onDelete,
  onDuplicate,
  onMove,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });
  return (
    <div
      ref={setNodeRef}
      style={{
        width: frameWidth,
        minHeight: 600,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        boxShadow: "0 8px 40px rgba(26,14,10,0.2)",
        transition: "width 300ms ease",
        overflow: "hidden",
        position: "relative",
        border: isOver ? "2px dashed #C4622D" : "none",
      }}
      id="canvas-frame"
    >
      <SortableContext items={components.map((c) => c.id)} strategy={rectSortingStrategy}>
        {components.length > 0 ? (
          components.map((component) => (
            <CanvasItem
              key={component.id}
              component={component}
              isSelected={selectedId === component.id}
              onSelect={() => onSelect(component.id)}
              onDelete={() => onDelete(component.id)}
              onDuplicate={() => onDuplicate(component.id)}
              onMoveUp={() => onMove(component.id, "up")}
              onMoveDown={() => onMove(component.id, "down")}
            />
          ))
        ) : (
          <EmptyCanvas />
        )}
      </SortableContext>
    </div>
  );
}

function CanvasItem({
  component,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "12px 16px",
    borderBottom: "1px solid #F5F0EB",
    cursor: "pointer",
    position: "relative",
    backgroundColor: isSelected ? "#FFFAF8" : isDragging ? "#FFF5EF" : "transparent",
    outline: isSelected ? "2px dashed #C4622D" : "none",
    outlineOffset: isSelected ? 2 : 0,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} onClick={onSelect}>
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: -32,
            right: 12,
            backgroundColor: "#1A0E0A",
            borderRadius: 6,
            padding: "4px 8px",
            display: "flex",
            gap: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <ToolbarButton icon={<IconArrowUp color="#FFFFFF" />} onClick={onMoveUp} />
          <ToolbarButton icon={<IconArrowDown color="#FFFFFF" />} onClick={onMoveDown} />
          <ToolbarButton icon={<IconDuplicate color="#FFFFFF" />} onClick={onDuplicate} />
          <ToolbarButton icon={<IconTrash color="#B03030" />} onClick={onDelete} />
        </div>
      )}
      {renderComponentPreview(component)}
    </div>
  );
}

function ToolbarButton({ icon, onClick }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        background: "none",
        border: "none",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
}

function EmptyCanvas() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 400,
        gap: 16,
        border: "2px dashed #E8D9C4",
        margin: 24,
        borderRadius: 12,
      }}
    >
      <IconPlusCircle color="#E8D9C4" size={48} />
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#B09070" }}>
        Drag components here
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#C4C4C4" }}>
        to build your page
      </div>
    </div>
  );
}

function PropertiesPanel({ component, updateProps }) {
  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "#7A5C44",
    textTransform: "uppercase",
    letterSpacing: 1,
  };
  const inputStyle = {
    padding: "6px 10px",
    border: "1px solid #E8D9C4",
    borderRadius: 6,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    outline: "none",
  };

  const renderInput = (label, value, onChange, type = "text") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "10px 16px" }}>
      <span style={labelStyle}>{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...inputStyle,
          borderColor: "#E8D9C4",
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
    </div>
  );

  const renderColorPicker = (label, value, onChange) => (
    <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={labelStyle}>{label}</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="color"
          value={value || "#FFFFFF"}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 48, height: 32, border: "1px solid #E8D9C4", borderRadius: 6 }}
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>
    </div>
  );

  const renderToggle = (label, value, onChange) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 16px",
      }}
    >
      <span style={labelStyle}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 20,
          border: "1px solid #E8D9C4",
          backgroundColor: value ? "#2D5A1B" : "#F5F0EB",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: value ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            transition: "all 150ms",
          }}
        />
      </button>
    </div>
  );

  const renderSectionHeader = (label) => (
    <div
      style={{
        backgroundColor: "#FBF4E9",
        padding: "8px 16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        color: "#7A5C44",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        borderBottom: "1px solid #E8D9C4",
      }}
    >
      {label}
    </div>
  );

  const commonLayout = (
    <>
      {renderSectionHeader("Layout")}
      {renderInput("Width", component?.props?.width || "", (v) => updateProps({ width: v }))}
      {renderInput("Height", component?.props?.height || "", (v) => updateProps({ height: v }))}
      <div style={{ padding: "10px 16px" }}>
        <span style={labelStyle}>Padding</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 6 }}>
          {["pt", "pr", "pb", "pl"].map((key) => (
            <input
              key={key}
              placeholder={key.toUpperCase()}
              value={component?.props?.[key] || ""}
              onChange={(e) => updateProps({ [key]: e.target.value })}
              style={{ ...inputStyle }}
            />
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 16px" }}>
        <span style={labelStyle}>Margin</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 6 }}>
          {["mt", "mr", "mb", "ml"].map((key) => (
            <input
              key={key}
              placeholder={key.toUpperCase()}
              value={component?.props?.[key] || ""}
              onChange={(e) => updateProps({ [key]: e.target.value })}
              style={{ ...inputStyle }}
            />
          ))}
        </div>
      </div>
      {renderInput(
        "Border Radius",
        component?.props?.radius || "",
        (v) => updateProps({ radius: v })
      )}
      {renderSectionHeader("Style")}
      {renderColorPicker(
        "Background Color",
        component?.props?.background || "",
        (v) => updateProps({ background: v })
      )}
      <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={labelStyle}>Border</span>
        {renderToggle(
          "Show Border",
          component?.props?.borderEnabled || false,
          (v) => updateProps({ borderEnabled: v })
        )}
        {component?.props?.borderEnabled && (
          <>
            {renderColorPicker(
              "Border Color",
              component?.props?.borderColor || "#E8D9C4",
              (v) => updateProps({ borderColor: v })
            )}
            {renderInput(
              "Border Width",
              component?.props?.borderWidth || "1px",
              (v) => updateProps({ borderWidth: v })
            )}
          </>
        )}
      </div>
      <div style={{ padding: "10px 16px" }}>
        <span style={labelStyle}>Opacity</span>
        <input
          type="range"
          min="0"
          max="100"
          value={component?.props?.opacity ?? 100}
          onChange={(e) => updateProps({ opacity: Number(e.target.value) })}
          style={{ width: "100%" }}
        />
      </div>
      {renderToggle("Shadow", component?.props?.shadow || false, (v) => updateProps({ shadow: v }))}
    </>
  );

  const renderTypeSpecific = () => {
    if (!component) return null;
    switch (component.type) {
      case "button":
        return (
          <>
            {renderSectionHeader("Content")}
            {renderInput("Label", component.props.label || "", (v) => updateProps({ label: v }))}
            {renderInput("Link URL", component.props.url || "", (v) => updateProps({ url: v }))}
            {renderSectionHeader("Button Style")}
            {renderColorPicker("Background Color", component.props.color || "#C4622D", (v) =>
              updateProps({ color: v })
            )}
            {renderColorPicker("Text Color", component.props.textColor || "#FFFFFF", (v) =>
              updateProps({ textColor: v })
            )}
            {renderInput("Size (Small/Medium/Large)", component.props.size || "Medium", (v) =>
              updateProps({ size: v })
            )}
            {renderInput("Variant (Filled/Outlined/Ghost)", component.props.variant || "Filled", (v) =>
              updateProps({ variant: v.toLowerCase() })
            )}
            {renderToggle("Full width", component.props.fullWidth || false, (v) =>
              updateProps({ fullWidth: v })
            )}
          </>
        );
      case "title":
      case "text":
        return (
          <>
            {renderSectionHeader("Content")}
            <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={labelStyle}>Text content</span>
              <textarea
                value={component.props.text || ""}
                onChange={(e) => updateProps({ text: e.target.value })}
                style={{
                  padding: 10,
                  border: "1px solid #E8D9C4",
                  borderRadius: 8,
                  minHeight: 80,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
            {renderSectionHeader("Typography")}
            {renderInput("Font Size (px)", component.props.fontSize || "", (v) =>
              updateProps({ fontSize: v })
            )}
            {renderInput("Font Weight", component.props.fontWeight || "Regular", (v) =>
              updateProps({ fontWeight: v })
            )}
            {renderInput("Text Align (left/center/right/justify)", component.props.align || "left", (v) =>
              updateProps({ align: v })
            )}
            {renderColorPicker("Text Color", component.props.color || "#2C1A0E", (v) =>
              updateProps({ color: v })
            )}
            {renderInput("Line Height", component.props.lineHeight || "", (v) =>
              updateProps({ lineHeight: v })
            )}
          </>
        );
      case "input":
      case "textarea":
        return (
          <>
            {renderSectionHeader("Content")}
            {renderInput("Label", component.props.label || "", (v) => updateProps({ label: v }))}
            {renderInput(
              "Placeholder",
              component.props.placeholder || "",
              (v) => updateProps({ placeholder: v })
            )}
            {renderToggle("Required", component.props.required || false, (v) =>
              updateProps({ required: v })
            )}
            {renderInput("Helper text", component.props.helper || "", (v) =>
              updateProps({ helper: v })
            )}
            {renderSectionHeader("Input Style")}
            {renderColorPicker(
              "Border Color",
              component.props.borderColor || "#E8D9C4",
              (v) => updateProps({ borderColor: v })
            )}
            {renderColorPicker(
              "Focus Color",
              component.props.focusColor || "#C4622D",
              (v) => updateProps({ focusColor: v })
            )}
          </>
        );
      case "dropdown":
      case "checkbox":
        return (
          <>
            {renderSectionHeader("Content")}
            {renderInput("Label", component.props.label || "", (v) => updateProps({ label: v }))}
            {renderInput(
              "Placeholder",
              component.props.placeholder || "",
              (v) => updateProps({ placeholder: v })
            )}
            {renderToggle("Required", component.props.required || false, (v) =>
              updateProps({ required: v })
            )}
          </>
        );
      case "image":
        return (
          <>
            {renderSectionHeader("Content")}
            {renderInput("Image URL", component.props.url || "", (v) => updateProps({ url: v }))}
            {renderInput("Alt text", component.props.alt || "", (v) => updateProps({ alt: v }))}
            {renderInput("Object fit (cover/contain/fill)", component.props.fit || "cover", (v) =>
              updateProps({ fit: v })
            )}
          </>
        );
      case "dataList":
        return (
          <>
            {renderSectionHeader("Data")}
            {renderInput("Connected table", component.props.table || "Users", (v) =>
              updateProps({ table: v })
            )}
            <div style={{ padding: "10px 16px" }}>
              <span style={labelStyle}>Columns (comma separated)</span>
              <input
                value={(component.props.columns || []).join(", ")}
                onChange={(e) =>
                  updateProps({
                    columns: e.target.value.split(",").map((c) => c.trim()).filter(Boolean),
                  })
                }
                style={{ ...inputStyle, marginTop: 6 }}
              />
            </div>
            {renderInput(
              "Items per page",
              component.props.perPage || 5,
              (v) => updateProps({ perPage: Number(v) || 0 }),
              "number"
            )}
            {renderToggle("Show pagination", component.props.pagination ?? true, (v) =>
              updateProps({ pagination: v })
            )}
          </>
        );
      case "badge":
        return (
          <>
            {renderSectionHeader("Content")}
            {renderInput("Text", component.props.text || "", (v) => updateProps({ text: v }))}
            {renderColorPicker("Color", component.props.color || "#D4A017", (v) =>
              updateProps({ color: v })
            )}
          </>
        );
      case "spacer":
        return (
          <>
            {renderSectionHeader("Spacing")}
            {renderInput(
              "Height (px)",
              component.props.height || 24,
              (v) => updateProps({ height: Number(v) || 0 }),
              "number"
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: 260,
        backgroundColor: "#FFFFFF",
        borderLeft: "1px solid #E8D9C4",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: 16,
          borderBottom: "1px solid #E8D9C4",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Properties
      </div>
      {!component && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            gap: 8,
            color: "#B09070",
          }}
        >
          <IconCursor color="#E8D9C4" size={40} />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>Select a component</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#C4C4C4" }}>
            to edit properties
          </div>
        </div>
      )}
      {component && (
        <div>
          {commonLayout}
          {renderTypeSpecific()}
        </div>
      )}
    </div>
  );
}

function TablesTab({ selectedTable, setSelectedTable, mockTables }) {
  const list = Object.keys(mockTables);
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div
        style={{
          width: 280,
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E8D9C4",
        }}
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E8D9C4",
          }}
        >
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18 }}>Tables</span>
          <button
            style={{
              backgroundColor: "#C4622D",
              border: "none",
              color: "#FFFFFF",
              borderRadius: 6,
              padding: "6px 12px",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            + New Table
          </button>
        </div>
        {list.map((table) => (
          <div
            key={table}
            onClick={() => setSelectedTable(table)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              cursor: "pointer",
              borderLeft:
                selectedTable === table ? "3px solid #C4622D" : "3px solid transparent",
              backgroundColor: selectedTable === table ? "#FFF0E8" : "transparent",
            }}
          >
            <IconTable color="#C4622D" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>{table}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>
                {mockTables[table].length} fields
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28 }}>
            {selectedTable}
          </span>
          <button
            style={{
              backgroundColor: "#C4622D",
              border: "none",
              color: "#FFFFFF",
              borderRadius: 6,
              padding: "6px 12px",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            + Add Field
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif" }}>
          <thead>
            <tr style={{ backgroundColor: "#FBF4E9" }}>
              {["Field Name", "Type", "Required", "Default", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    fontSize: 12,
                    color: "#7A5C44",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockTables[selectedTable].map((field) => (
              <tr key={field.id} style={{ borderBottom: "1px solid #F0E6D8" }}>
                <td style={{ padding: "10px 12px" }}>{field.name}</td>
                <td style={{ padding: "10px 12px" }}>
                  <TypeBadge type={field.type} />
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <TogglePill
                    label={field.required ? "Yes" : "No"}
                    active={field.required}
                    onClick={() => {}}
                  />
                </td>
                <td style={{ padding: "10px 12px", color: "#7A5C44" }}>{field.default}</td>
                <td style={{ padding: "10px 12px", display: "flex", gap: 10 }}>
                  <IconEdit color="#7A5C44" />
                  <IconTrash color="#B03030" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  const styles = {
    Text: { bg: "#EEF0FF", color: "#1a3a7a" },
    Number: { bg: "#FFF0E8", color: "#A04E22" },
    Boolean: { bg: "#E8F5EC", color: "#1E6B3C" },
    Date: { bg: "#FBF0E8", color: "#8B5E2A" },
    Email: { bg: "#F0E8FF", color: "#5A2A8B" },
    UUID: { bg: "#E8F5FC", color: "#1A5A7A" },
    JSON: { bg: "#FFF8E8", color: "#8B6E1A" },
  }[type] || { bg: "#FBF4E9", color: "#7A5C44" };
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 14,
        backgroundColor: styles.bg,
        color: styles.color,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
      }}
    >
      {type}
    </span>
  );
}

function WorkflowsTab({ workflows, openModal }) {
  return (
    <div style={{ flex: 1, padding: 32, overflowY: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28 }}>Workflows</span>
        <button
          onClick={openModal}
          style={{
            backgroundColor: "#C4622D",
            border: "none",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "8px 14px",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
          }}
        >
          + New Workflow
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {workflows.map((wf) => (
          <div
            key={wf.name}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: "20px 24px",
              boxShadow: "0 2px 8px rgba(44,26,14,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#FFF0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconLightning color="#C4622D" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600 }}>
                {wf.name}
              </div>
              <div style={{ color: "#7A5C44", fontFamily: "'DM Sans', sans-serif" }}>{wf.summary}</div>
            </div>
            <TogglePill label={wf.active ? "Active" : "Inactive"} active={wf.active} onClick={() => {}} />
            <div style={{ display: "flex", gap: 10 }}>
              <IconEdit color="#7A5C44" />
              <IconTrash color="#B03030" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowModal({ step, setStep, onClose }) {
  const steps = [1, 2, 3];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 300,
      }}
    >
      <div
        style={{
          width: 540,
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 12px 36px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>New Workflow</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <IconClose color="#7A5C44" />
          </button>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "16px 0" }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: s === step ? "#C4622D" : s < step ? "#2D5A1B" : "#E8D9C4",
                }}
              />
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: "#E8D9C4" }} />}
            </React.Fragment>
          ))}
        </div>
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Trigger</span>
            <input placeholder="When..." style={modalInputStyle} />
            <input placeholder="Table" style={modalInputStyle} />
            <input placeholder="Event" style={modalInputStyle} />
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Condition</span>
            <input placeholder="If..." style={modalInputStyle} />
            <input placeholder="Field" style={modalInputStyle} />
            <input placeholder="Operator" style={modalInputStyle} />
            <input placeholder="Value (optional)" style={modalInputStyle} />
          </div>
        )}
        {step === 3 && (
          <div style={{ display: "flex", gap: 12 }}>
            {["Email", "Notification", "Update Field"].map((action) => (
              <div
                key={action}
                style={{
                  flex: 1,
                  border: "1px solid #E8D9C4",
                  borderRadius: 12,
                  padding: 16,
                  cursor: "pointer",
                  backgroundColor: "#FBF4E9",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{action}</div>
                <div style={{ color: "#7A5C44", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
                  Quick template
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid #E8D9C4",
              padding: "8px 14px",
              borderRadius: 10,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            style={{
              backgroundColor: "#C4622D",
              border: "none",
              color: "#FFFFFF",
              padding: "8px 14px",
              borderRadius: 10,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {step === 3 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

const modalInputStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #E8D9C4",
  fontFamily: "'DM Sans', sans-serif",
};

function AiChatPanel({
  open,
  onClose,
  projectName,
  chatMessages,
  chatInput,
  setChatInput,
  sendMessage,
  isTyping,
  chatEndRef,
}) {
  const suggested = [
    "Design a data table for my app",
    "What components should I use?",
    "Help me create a form",
    "How do I add a workflow?",
  ];
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 56,
        width: 360,
        height: "calc(100vh - 56px)",
        backgroundColor: "#FFFFFF",
        borderLeft: "1px solid #E8D9C4",
        boxShadow: "-4px 0 20px rgba(26,14,10,0.1)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 300ms ease",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 56,
          backgroundColor: "#1A0E0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconBrain color="#D4A017" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#FFFFFF", fontSize: 14 }}>
            AI Assistant
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#2D5A1B",
              borderRadius: "50%",
            }}
          />
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <IconClose color="#A08060" />
        </button>
      </div>
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#FBF4E9",
          borderBottom: "1px solid #E8D9C4",
        }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#7A5C44" }}>
          Chatting about:
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#C4622D",
          }}
        >
          {projectName}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {chatMessages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A5C44" }}>
              Try asking:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {suggested.map((s) => (
                <button
                  key={s}
                  onClick={() => setChatInput(s)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 20,
                    border: "1px solid #E8D9C4",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#7A5C44",
                    backgroundColor: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#C4622D" : "#FBF4E9",
              color: msg.role === "user" ? "#FFFFFF" : "#2C1A0E",
              border: msg.role === "user" ? "none" : "1px solid #E8D9C4",
              borderRadius:
                msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              padding: "10px 14px",
              maxWidth: "85%",
              fontFamily: "'DM Sans', sans-serif",
              position: "relative",
            }}
          >
            {msg.role === "ai" && (
              <div
                style={{
                  position: "absolute",
                  left: -38,
                  top: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "#1A0E0A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconBrain color="#D4A017" size={14} />
              </div>
            )}
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#FBF4E9",
              border: "1px solid #E8D9C4",
              borderRadius: "12px 12px 12px 2px",
              padding: "10px 14px",
              maxWidth: "85%",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <TypingDots />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #E8D9C4",
          backgroundColor: "#FFFFFF",
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask about your project..."
          rows={1}
          style={{
            flex: 1,
            padding: "10px 14px",
            border: "1.5px solid #E8D9C4",
            borderRadius: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            resize: "none",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!chatInput.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: chatInput.trim() ? "#C4622D" : "#E8D9C4",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: chatInput.trim() ? "pointer" : "not-allowed",
          }}
        >
          <IconSend color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}

function TypingDots() {
  const dotStyle = (delay) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#7A5C44",
    animation: `bounce 1s ease-in-out ${delay}s infinite`,
  });
  return (
    <>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }`}</style>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={dotStyle(0)} />
        <div style={dotStyle(0.2)} />
        <div style={dotStyle(0.4)} />
      </div>
    </>
  );
}

// ───────────────────── RENDER PREVIEWS ────────────────────────
function renderComponentPreview(component) {
  const commonBox = {
    borderRadius: component.props.radius || 8,
    backgroundColor: component.props.background || "transparent",
    padding: component.props.padding || 0,
    margin: component.props.margin || 0,
    boxShadow: component.props.shadow ? "0 6px 16px rgba(0,0,0,0.08)" : "none",
    opacity: component.props.opacity ? component.props.opacity / 100 : 1,
  };

  switch (component.type) {
    case "title":
      return (
        <div style={{ ...commonBox }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: component.props.fontSize || 24,
              color: component.props.color || "#2C1A0E",
              fontWeight: component.props.fontWeight || 700,
              textAlign: component.props.align || "left",
              lineHeight: component.props.lineHeight || 1.2,
            }}
          >
            {component.props.text || "Page Title"}
          </div>
        </div>
      );
    case "text":
      return (
        <div style={{ ...commonBox }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: component.props.fontSize || 14,
              color: component.props.color || "#7A5C44",
              lineHeight: component.props.lineHeight || 1.5,
              textAlign: component.props.align || "left",
            }}
          >
            {component.props.text ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </div>
        </div>
      );
    case "button":
      return (
        <div style={{ ...commonBox }}>
          <button
            style={{
              backgroundColor:
                component.props.variant === "outlined"
                  ? "transparent"
                  : component.props.color || "#C4622D",
              color:
                component.props.variant === "ghost"
                  ? component.props.color || "#C4622D"
                  : component.props.textColor || "#FFFFFF",
              border:
                component.props.variant === "outlined"
                  ? `1px solid ${component.props.color || "#C4622D"}`
                  : "none",
              padding:
                component.props.size === "small"
                  ? "8px 12px"
                  : component.props.size === "large"
                  ? "14px 18px"
                  : "10px 14px",
              borderRadius: 12,
              cursor: "pointer",
              width: component.props.fullWidth ? "100%" : "auto",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {component.props.label || "Button"}
          </button>
        </div>
      );
    case "input":
      return (
        <div style={{ ...commonBox, display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C44", fontSize: 13 }}>
            {component.props.label || "Field Label"}
          </label>
          <input
            placeholder={component.props.placeholder || "Enter text"}
            style={{
              padding: "10px 12px",
              border: `1px solid ${component.props.borderColor || "#E8D9C4"}`,
              borderRadius: 10,
              outline: "none",
            }}
          />
          {component.props.helper && (
            <span style={{ color: "#B09070", fontSize: 12 }}>{component.props.helper}</span>
          )}
        </div>
      );
    case "textarea":
      return (
        <div style={{ ...commonBox, display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C44", fontSize: 13 }}>
            {component.props.label || "Text Area"}
          </label>
          <textarea
            placeholder={component.props.placeholder || "Type here"}
            style={{
              padding: "10px 12px",
              border: `1px solid ${component.props.borderColor || "#E8D9C4"}`,
              borderRadius: 10,
              minHeight: 80,
              outline: "none",
            }}
          />
          {component.props.helper && (
            <span style={{ color: "#B09070", fontSize: 12 }}>{component.props.helper}</span>
          )}
        </div>
      );
    case "dropdown":
      return (
        <div style={{ ...commonBox, display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C44", fontSize: 13 }}>
            {component.props.label || "Select"}
          </label>
          <select
            style={{
              padding: "10px 12px",
              border: "1px solid #E8D9C4",
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
            }}
          >
            <option>{component.props.placeholder || "Choose an option"}</option>
          </select>
        </div>
      );
    case "checkbox":
      return (
        <div style={{ ...commonBox, display: "flex", alignItems: "center", gap: 10 }}>
          <input type="checkbox" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#2C1A0E" }}>
            {component.props.label || "Checkbox label"}
          </span>
        </div>
      );
    case "image":
      return (
        <div style={{ ...commonBox }}>
          <div
            style={{
              width: "100%",
              height: 160,
              backgroundColor: "#F4E8DA",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {component.props.url ? (
              <img
                src={component.props.url}
                alt={component.props.alt || "image"}
                style={{ width: "100%", height: "100%", objectFit: component.props.fit || "cover" }}
              />
            ) : (
              <IconImage color="#C4622D" size={36} />
            )}
          </div>
        </div>
      );
    case "dataList":
      return (
        <div style={{ ...commonBox }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 8 }}>
            {component.props.table || "Users"} List
          </div>
          <div
            style={{
              border: "1px solid #E8D9C4",
              borderRadius: 10,
              overflow: "hidden",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
            }}
          >
            <div style={{ display: "flex", backgroundColor: "#FBF4E9", padding: "8px 12px", gap: 12 }}>
              {(component.props.columns || ["name", "email"]).map((c) => (
                <div key={c} style={{ flex: 1, color: "#7A5C44" }}>
                  {c}
                </div>
              ))}
            </div>
            {[1, 2].map((row) => (
              <div
                key={row}
                style={{ display: "flex", padding: "10px 12px", gap: 12, borderTop: "1px solid #F0E6D8" }}
              >
                {(component.props.columns || ["name", "email"]).map((c) => (
                  <div key={c} style={{ flex: 1, color: "#2C1A0E" }}>
                    {c} {row}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    case "card":
      return (
        <div
          style={{
            ...commonBox,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 6 }}>
            {component.props.title || "Card Title"}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C44" }}>
            {component.props.text || "Card description text goes here."}
          </div>
        </div>
      );
    case "divider":
      return <div style={{ height: 1, backgroundColor: "#E8D9C4" }} />;
    case "spacer":
      return (
        <div
          style={{
            height: component.props.height || 24,
            border: "1px dashed #E8D9C4",
            background: "rgba(236, 221, 204, 0.3)",
          }}
        />
      );
    case "badge":
      return (
        <span
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: 999,
            backgroundColor: component.props.color || "#D4A017",
            color: "#1A0E0A",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          {component.props.text || "Badge"}
        </span>
      );
    case "barChart":
      return (
        <svg width="100%" height="120" viewBox="0 0 200 120">
          <rect x="20" y="60" width="24" height="40" fill="#C4622D" rx="4" />
          <rect x="70" y="40" width="24" height="60" fill="#D4A017" rx="4" />
          <rect x="120" y="20" width="24" height="80" fill="#7A5C44" rx="4" />
          <rect x="170" y="45" width="24" height="55" fill="#A04E22" rx="4" />
        </svg>
      );
    case "lineChart":
      return (
        <svg width="100%" height="120" viewBox="0 0 200 120">
          <polyline
            points="10,90 50,70 90,80 130,40 170,50 190,30"
            fill="none"
            stroke="#C4622D"
            strokeWidth="3"
          />
          <polyline
            points="10,100 50,90 90,70 130,60 170,45 190,40"
            fill="none"
            stroke="#7A5C44"
            strokeWidth="2"
          />
        </svg>
      );
    case "pieChart":
      return (
        <svg width="160" height="160" viewBox="0 0 32 32" style={{ display: "block" }}>
          <circle r="16" cx="16" cy="16" fill="#E8D9C4" />
          <path d="M16 16 L16 0 A16 16 0 0 1 31 19 Z" fill="#C4622D" />
          <path d="M16 16 L31 19 A16 16 0 0 1 8 30 Z" fill="#D4A017" />
          <path d="M16 16 L8 30 A16 16 0 0 1 16 0 Z" fill="#7A5C44" />
        </svg>
      );
    case "container":
      return (
        <div
          style={{
            ...commonBox,
            border: "1px dashed #E8D9C4",
            padding: 12,
            borderRadius: 12,
            color: "#7A5C44",
          }}
        >
          Container block
        </div>
      );
    case "columns":
      return (
        <div
          style={{
            ...commonBox,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 8,
          }}
        >
          <div style={{ height: 60, backgroundColor: "#FBF4E9", borderRadius: 8 }} />
          <div style={{ height: 60, backgroundColor: "#FBF4E9", borderRadius: 8 }} />
        </div>
      );
    default:
      return <div>Component</div>;
  }
}

// ───────────────────────── ICONS ───────────────────────────────
const IconBack = ({ color = "#2C1A0E" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const IconChevron = ({ color = "#7A5C44" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const IconBox = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M3 7l9 4 9-4-9-4-9 4v10l9 4 9-4V7" />
  </svg>
);

const IconColumns = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="4" width="7" height="16" rx="1.5" />
    <rect x="14" y="4" width="7" height="16" rx="1.5" />
  </svg>
);

const IconDivider = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="4" y1="12" x2="20" y2="12" />
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="18" cy="12" r="1.5" />
  </svg>
);

const IconSpacer = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 4h16M4 20h16M12 8v8" />
    <path d="M9 11l3-3 3 3M9 13l3 3 3-3" />
  </svg>
);

const IconInput = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <line x1="6" y1="12" x2="9" y2="12" />
  </svg>
);

const IconButton = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="4" y="8" width="16" height="8" rx="3" />
  </svg>
);

const IconDropdown = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M8 10l4 4 4-4" />
  </svg>
);

const IconCheckbox = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 12l3 3 5-5" />
  </svg>
);

const IconTextarea = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

const IconUpload = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 16V4" />
    <path d="M7 9l5-5 5 5" />
    <path d="M5 20h14" />
  </svg>
);

const IconTitle = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 6h16M10 6v12" />
  </svg>
);

const IconText = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M5 7h14M5 12h10M5 17h8" />
  </svg>
);

const IconImage = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="4" y="5" width="16" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="M4 16l5-4 3 3 4-3 4 4" />
  </svg>
);

const IconTable = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M9 4v16M15 4v16" />
  </svg>
);

const IconCard = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="4" y="5" width="16" height="14" rx="3" />
    <path d="M8 9h8M8 13h5" />
  </svg>
);

const IconBadge = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="5" y="9" width="14" height="6" rx="3" />
  </svg>
);

const IconBar = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M5 20v-8M12 20v-14M19 20v-4" />
  </svg>
);

const IconLine = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 16l5-5 4 3 7-7" />
    <circle cx="4" cy="16" r="1.5" />
    <circle cx="9" cy="11" r="1.5" />
    <circle cx="13" cy="14" r="1.5" />
    <circle cx="20" cy="7" r="1.5" />
  </svg>
);

const IconPie = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M11 3a9 9 0 0 1 9 9h-9z" />
    <path d="M11 3a9 9 0 1 0 9 9h-9z" />
  </svg>
);

const IconPlusCircle = ({ color = "#C4622D", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const IconCursor = ({ color = "#C4622D", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 4l7 18 2-7 7-2z" />
  </svg>
);

const IconArrowUp = ({ color = "#FFFFFF", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const IconArrowDown = ({ color = "#FFFFFF", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const IconDuplicate = ({ color = "#FFFFFF", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M4 4h12v12" />
  </svg>
);

const IconTrash = ({ color = "#B03030", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconClose = ({ color = "#7A5C44", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

const IconBrain = ({ color = "#D4A017", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M9 4a3 3 0 0 0-3 3v2a3 3 0 0 0 0 6v2a3 3 0 0 0 3 3" />
    <path d="M15 4a3 3 0 0 1 3 3v2a3 3 0 0 1 0 6v2a3 3 0 0 1-3 3" />
    <path d="M12 4v16" />
  </svg>
);

const IconLightning = ({ color = "#C4622D", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M13 2L3 14h8l-2 8 10-12h-8z" />
  </svg>
);

const IconEdit = ({ color = "#7A5C44", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 20h4l10-10-4-4L4 16v4z" />
    <path d="M14 6l4 4" />
  </svg>
);

const IconSend = ({ color = "#FFFFFF", size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </svg>
);
