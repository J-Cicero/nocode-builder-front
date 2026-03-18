import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [plan, setPlan] = useState("free");
  const [showEnterpriseFields, setShowEnterpriseFields] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    companySize: ""
  });
  const [error, setError] = useState("");

  const passwordStrength = (pswd) => {
    let score = 0;
    if (pswd.length >= 8) score++;
    if (/[A-Z]/.test(pswd)) score++;
    if (/\d/.test(pswd)) score++;
    if (/[!@#$%^&*]/.test(pswd)) score++;
    return score;
  };

  const strengthLevel = passwordStrength(formData.password);
  const strengthTexts = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-error", "bg-orange-500", "bg-yellow-500", "bg-green"];

  const handlePlanChange = (newPlan) => {
    setPlan(newPlan);
    setShowEnterpriseFields(newPlan === "enterprise");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (showEnterpriseFields && !formData.companyName) {
      setError("Please fill in company name");
      return;
    }

    try {
      await register({
        ...formData,
        plan
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen bg-bg">
      {/* Left column - same as LoginPage */}
      <div className="hidden md:flex md:w-1/2 bg-dark flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
          >
            <pattern id="kente" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="20" height="20" fill="#C4622D" />
              <rect x="20" y="20" width="20" height="20" fill="#C4622D" />
              <circle cx="10" cy="10" r="3" fill="#D4A017" />
              <circle cx="30" cy="30" r="3" fill="#D4A017" />
            </pattern>
            <rect x="0" y="0" width="400" height="400" fill="url(#kente)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="text-secondary text-2xl font-playfair-display font-bold">
              BuildrAfrica
            </span>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-playfair-display font-bold text-white mb-4">
            Build apps.
            <br />
            No code needed.
          </h1>
          <p className="text-text-muted text-lg mb-12">
            Create powerful applications visually, in minutes.
          </p>

          <div className="flex justify-center gap-8 text-sm text-secondary">
            <span>2,400+ Apps</span>
            <span>·</span>
            <span>150+ Countries</span>
            <span>·</span>
            <span>Free to start</span>
          </div>
        </div>

        <div></div>
      </div>

      {/* Right column */}
      <div className="w-full md:w-1/2 bg-bg flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm py-8">
          {/* Mobile logo */}
          <div className="md:hidden mb-8 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="text-secondary text-xl font-playfair-display font-bold">
                BuildrAfrica
              </span>
            </div>
          </div>

          <h2 className="text-3xl font-playfair-display font-bold text-text mb-8">
            Create your account
          </h2>

          {/* Plan selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { id: "free", icon: "⚡", label: "Free Plan", desc: "Perfect to get started", price: "$0/month" },
              { id: "enterprise", icon: "🏢", label: "Enterprise", desc: "For growing teams", price: "Custom pricing" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handlePlanChange(option.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  plan === option.id
                    ? "border-primary bg-primary bg-opacity-5"
                    : "border-border hover:border-primary"
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <p className="font-medium text-text text-sm">{option.label}</p>
                <p className="text-xs text-text-muted">{option.desc}</p>
                <p className="text-xs font-bold text-primary mt-2">{option.price}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                name="firstName"
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                name="lastName"
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              required
            />

            {/* Password with strength */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                required
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${i < strengthLevel ? strengthColors[strengthLevel - 1] : "bg-border"}`}
                      ></div>
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${strengthColors[strengthLevel - 1] || "text-text-muted"}`}>
                    {strengthTexts[strengthLevel - 1] || "Too weak"}
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Phone (Optional)"
              type="tel"
              placeholder="+234 900 000 0000"
              value={formData.phone}
              onChange={handleInputChange}
              name="phone"
            />

            {/* Enterprise fields */}
            {showEnterpriseFields && (
              <div className="space-y-4 mt-6 pt-6 border-t border-border animate-in fade-in slide-in-from-top-1 duration-300">
                <Input
                  label="Company Name"
                  placeholder="Your Company"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  name="companyName"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={handleInputChange}
                    name="companySize"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-white font-dm-sans"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-error text-error p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              size="md"
            >
              Create Account
            </Button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-text-muted text-sm mt-6 font-dm-sans">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
