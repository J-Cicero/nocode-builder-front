import { useState } from "react";
import { useProjects } from "../../store/projectStore";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

export default function NewProjectModal({ isOpen, onClose }) {
  const { createProject } = useProjects();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: false
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Project name is required");
      return;
    }

    setLoading(true);
    
    // Simulate delay
    setTimeout(() => {
      createProject({
        name: formData.name,
        description: formData.description,
        is_public: formData.isPublic
      });
      
      setFormData({ name: "", description: "", isPublic: false });
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Project Name"
          placeholder="My Awesome App"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
            Description (Optional)
          </label>
          <textarea
            name="description"
            placeholder="What is this project about?"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans resize-none"
            rows="3"
          />
        </div>

        {/* Toggle switch */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text font-dm-sans">
            Make it public
          </label>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              formData.isPublic ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                formData.isPublic ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
