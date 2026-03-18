import { useState } from "react";
import Button from "../../common/Button";
import Modal from "../../common/Modal";

const MOCK_WORKFLOWS = [
  {
    id: "w1",
    name: "Welcome Email",
    active: true,
    trigger: "Users created",
    action: "Send email"
  },
  {
    id: "w2",
    name: "Low Stock Alert",
    active: false,
    trigger: "Products updated",
    action: "Send SMS"
  }
];

export default function TabWorkflows() {
  const [workflows, setWorkflows] = useState(MOCK_WORKFLOWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    trigger: "",
    condition: "",
    action: ""
  });

  const toggleWorkflow = (id) => {
    setWorkflows(workflows.map(w =>
      w.id === id ? { ...w, active: !w.active } : w
    ));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveWorkflow = () => {
    // In a real app, we'd save this to state
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({ trigger: "", condition: "", action: "" });
  };

  return (
    <div className="h-full bg-bg p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-playfair-display font-bold text-text">Workflows</h2>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          + New Workflow
        </Button>
      </div>

      {/* Workflows grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
          >
            {/* Icon and active toggle */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-2xl">⚡</div>
              <button
                onClick={() => toggleWorkflow(workflow.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  workflow.active ? "bg-primary" : "bg-border"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                    workflow.active ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Name */}
            <h3 className="font-playfair-display font-bold text-lg text-text mb-2">
              {workflow.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-text-muted mb-4">
              When <strong>{workflow.trigger}</strong> → {workflow.action}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-bg hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium text-text border border-border">
                Edit
              </button>
              <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-error rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Workflow Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Workflow">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step <= currentStep
                    ? "bg-primary text-white"
                    : "bg-border text-text-muted"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`h-1 w-12 mx-2 transition-colors ${
                    step < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
                Trigger Table
              </label>
              <select
                value={formData.trigger}
                onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans"
              >
                <option value="">Select table</option>
                <option value="users">Users</option>
                <option value="products">Products</option>
                <option value="orders">Orders</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
                Event
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans"
              >
                <option value="">Select event</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="deleted">Deleted</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
                Condition (Optional)
              </label>
              <textarea
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans resize-none"
                rows="3"
                placeholder="e.g., if quantity < 100"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2 font-dm-sans">
                Action
              </label>
              <select
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans"
              >
                <option value="">Select action</option>
                <option value="email">Send Email</option>
                <option value="sms">Send SMS</option>
                <option value="webhook">Call Webhook</option>
                <option value="create">Create Record</option>
              </select>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-border">
          {currentStep > 1 && (
            <Button variant="ghost" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          {currentStep < 3 ? (
            <Button variant="primary" onClick={handleNextStep}>
              Next
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSaveWorkflow}>
              Save Workflow
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
