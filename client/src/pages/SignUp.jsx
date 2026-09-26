import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthSplitLayout from "../components/auth/AuthSplitLayout.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/workflow");
  }

  return (
    <AuthSplitLayout
      badge="Collaborative Brand Engine"
      heading="Join Brandloom."
      highlight="Start building."
      description="Create an account to turn a rough idea into a launch-ready brand system — staged, structured and checked."
    >
      <div className="w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-2xl font-bold text-white shadow-lg">
            B
          </span>
          <h2 className="mt-4 text-xl font-bold text-[var(--text)]">Brandloom</h2>
          <p className="mt-3 text-lg font-bold text-[var(--text)]">Create Account</p>
          <p className="mt-1 text-sm text-[var(--text-soft)]">Sign up to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-soft)]">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--accent-solid)]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-soft)]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--accent-solid)]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-soft)]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 pr-10 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--accent-solid)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)] hover:text-[var(--accent-solid)]"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Create account →
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--text-soft)]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[var(--accent-solid)]">
            Sign in
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}