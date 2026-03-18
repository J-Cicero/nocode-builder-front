import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const kentePatternId = useMemo(() => `kente-${Math.random().toString(36).slice(2, 7)}`, []);

  const validate = () => {
    const nextErrors = { email: "", password: "" };

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    }
    if (!password.trim()) {
      nextErrors.password = "Please enter your password.";
    }

    setFieldErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    }
  };

  const renderIcon = (name, props = {}) => {
    if (name === "mail") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.75A2.25 2.25 0 0 1 5.75 4.5h12.5A2.25 2.25 0 0 1 20.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.75A2.25 2.25 0 0 1 3.5 17.25V6.75Z" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m4.5 7.5 6.763 4.348a2.25 2.25 0 0 0 2.474 0L20.5 7.5" />
        </svg>
      );
    }
    if (name === "lock") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <rect x="5" y="10" width="14" height="10" rx="2" strokeWidth="1.5" />
          <path strokeWidth="1.5" strokeLinecap="round" d="M9 10V7a3 3 0 1 1 6 0v3" />
        </svg>
      );
    }
    if (name === "eye") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );
    }
    if (name === "eye-off") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3 3 18 18" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.477 5.112C10.974 5.038 11.484 5 12 5c4.478 0 8.268 2.943 9.542 7a10.73 10.73 0 0 1-2.104 3.623" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.598 6.608C4.65 7.83 3.215 9.68 2.458 12c1.274 4.057 5.064 7 9.542 7 1.237 0 2.437-.2 3.568-.572" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
        </svg>
      );
    }
    if (name === "warning") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.5" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m10.073 4.247-7.03 12.153A2 2 0 0 0 4.73 19.75h14.54a2 2 0 0 0 1.687-3.35L13.927 4.247a2 2 0 0 0-3.854 0Z" />
        </svg>
      );
    }
    return null;
  };

  const inputBaseClasses =
    "w-full bg-white border-[1.5px] border-[#E8D9C4] rounded-lg px-12 py-3 text-[15px] text-[#2C1A0E] placeholder-[#B09070] transition duration-200 focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/15 outline-none";

  return (
    <div className="min-h-screen flex bg-[#FBF4E9]">
      {/* Left column */}
      <div className="relative hidden md:flex w-1/2 bg-[#1A0E0A] text-white flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <defs>
              <pattern id={kentePatternId} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <g fill="#C4622D" opacity="0.15">
                  <path d="M20 0 40 20 20 40 0 20Z" />
                  <path d="M60 40 80 60 60 80 40 60Z" />
                  <path d="M40 0 60 20 40 40 20 20Z" />
                  <path d="M0 60 20 80 0 100 -20 80Z" />
                  <path d="M0 0 80 80" stroke="#C4622D" strokeWidth="4" strokeLinecap="square" />
                  <path d="M80 0 0 80" stroke="#C4622D" strokeWidth="4" strokeLinecap="square" />
                  <path d="M40 0v80" stroke="#C4622D" strokeWidth="3" />
                  <path d="M0 40h80" stroke="#C4622D" strokeWidth="3" />
                </g>
              </pattern>
            </defs>
            <rect x="0" y="0" width="400" height="400" fill={`url(#${kentePatternId})`} />
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#C4622D] flex items-center justify-center text-white text-xl font-playfair-display">
            B
          </div>
          <span className="text-2xl text-[#D4A017] font-playfair-display font-semibold">
            BuildrAfrica
          </span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl leading-tight font-playfair-display font-semibold text-white">
            Build apps.
            <br />
            No code
            <br />
            needed.
          </h1>
          <div className="w-16 h-[2px] bg-[#D4A017]" />
          <p className="text-[16px] max-w-xl text-[#A08060] font-dm-sans">
            Create powerful applications visually, connect your data, automate your workflows — all
            without writing a single line of code.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-6 text-sm text-[#A08060]">
            <div className="flex flex-col">
              <span className="text-[#D4A017] text-xl font-semibold">2,400+</span>
              <span>Apps Built</span>
            </div>
            <span className="text-[#3D2010]">|</span>
            <div className="flex flex-col">
              <span className="text-[#D4A017] text-xl font-semibold">150+</span>
              <span>Countries</span>
            </div>
            <span className="text-[#3D2010]">|</span>
            <div className="flex flex-col">
              <span className="text-[#D4A017] text-xl font-semibold">Free</span>
              <span>To Start</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="w-full md:w-1/2 bg-[#FBF4E9] flex items-center justify-center px-6 py-10 md:px-12">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="flex justify-end text-[14px] text-[#7A5C44]">
            <span className="mr-2">New here?</span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#C4622D] font-medium hover:underline inline-flex items-center gap-1"
            >
              Create an account
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Mobile brand */}
          <div className="md:hidden flex justify-center">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#C4622D] flex items-center justify-center text-white text-xl font-playfair-display">
                B
              </div>
              <span className="text-xl text-[#D4A017] font-playfair-display font-semibold">
                BuildrAfrica
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] tracking-[0.3em] font-semibold text-[#C4622D]">WELCOME BACK</p>
            <h2 className="text-[32px] font-playfair-display text-[#2C1A0E] leading-tight">
              Sign in to your account
            </h2>
            <p className="text-[14px] text-[#7A5C44]">
              Enter your credentials to access your projects.
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-[10px] border-l-[3px] border-[#B03030] bg-[#FFF0F0] px-4 py-3 text-[13px] text-[#B03030]">
              <span className="mt-0.5 text-[#B03030]">
                {renderIcon("warning", { className: "w-5 h-5" })}
              </span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[14px] font-semibold text-[#2C1A0E] font-dm-sans">
                Email address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A5C44]">
                  {renderIcon("mail", { className: "w-5 h-5" })}
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`${inputBaseClasses} ${fieldErrors.email ? "border-[#B03030]" : ""}`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-[13px] text-[#B03030] font-dm-sans">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[14px] font-semibold text-[#2C1A0E] font-dm-sans">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A5C44]">
                  {renderIcon("lock", { className: "w-5 h-5" })}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputBaseClasses} ${fieldErrors.password ? "border-[#B03030]" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A5C44] hover:text-[#2C1A0E]"
                >
                  {showPassword
                    ? renderIcon("eye-off", { className: "w-5 h-5" })
                    : renderIcon("eye", { className: "w-5 h-5" })}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-[13px] text-[#B03030] font-dm-sans">{fieldErrors.password}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[13px] text-[#C4622D] hover:underline font-medium"
                  onClick={() => alert("Password reset not implemented yet")}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-[#C4622D] text-white font-dm-sans text-[16px] font-medium transition transform hover:bg-[#A04E22] hover:-translate-y-[1px] active:translate-y-[1px] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-[#C4622D]/20"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 text-[13px] text-[#7A5C44]">
            <div className="flex-1 h-px bg-[#E8D9C4]" />
            <span>or continue with</span>
            <div className="flex-1 h-px bg-[#E8D9C4]" />
          </div>

          <button
            type="button"
            className="w-full h-12 rounded-lg bg-white border-[1.5px] border-[#E8D9C4] text-[#2C1A0E] font-medium flex items-center justify-center gap-3 hover:border-[#C4622D] transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272.1v95.4h146.9c-6.3 34.1-25.1 62.9-53.5 82.2v68h86.5c50.6-46.6 81.5-115.4 81.5-195.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c72.8 0 133.8-24.1 178.4-65.7l-86.5-68c-24.1 16.3-55 26-91.9 26-70.6 0-130.4-47.6-151.8-111.5H30.6v69.9c44.6 88.5 136.3 148.3 241.5 148.3z"
                fill="#34a853"
              />
              <path
                d="M120.3 325.1c-11-32.9-11-68.4 0-101.3V154H30.6c-39.2 78.4-39.2 171.8 0 250.2z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.9-.6 76.1 13.6 104.4 39.8l77.8-77.8C405.7 24.1 344.9 0 272.1 0 166.9 0 75.2 59.8 30.6 148.3l89.7 69.8C141.7 155.3 201.5 107.7 272.1 107.7z"
                fill="#ea4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="text-center text-[14px] text-[#7A5C44]">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#C4622D] font-semibold hover:underline"
            >
              Create one for free
            </button>
          </div>

          <p className="pt-6 text-center text-[11px] text-[#B09070]">
            © 2025 BuildrAfrica · Terms · Privacy
          </p>
        </div>
      </div>
    </div>
  );
}
