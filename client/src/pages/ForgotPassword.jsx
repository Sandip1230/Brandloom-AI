import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthSplitLayout from "../components/auth/AuthSplitLayout.jsx";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // No email/reset backend wired up yet — placeholder only.
    alert(`If an account exists for ${email}, a reset code would be sent.`);
    navigate("/login");
  }

  return (
    <AuthSplitLayout
      badge="Collaborative Brand Engine"
      heading="Forgot your"
      highlight="password?"
      description="No worries. Enter the email on your account and we'll send you a 6-digit code to set a new one."
    >
      <div className="w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] text-2xl font-bold text-white shadow-lg">
            B
          </span>
          <h2 className="mt-4 text-xl font-bold text-[var(--text)]">Brandloom</h2>
          <p className="mt-3 text-lg font-bold text-[var(--text)]">Reset Password</p>
          <p className="mt-1 text-sm text-[var(--text-soft)]">Enter your account email to receive a code.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Send code →
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          <Link to="/login" className="font-semibold text-[var(--accent-solid)]">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}