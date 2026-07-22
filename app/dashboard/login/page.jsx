"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch { setError("Invalid email or password."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-gold text-2xl lg:text-3xl font-bold tracking-widest">AHMED RAGAB</h1>
          <p className="font-sans text-white/40 text-xs tracking-widest uppercase mt-2">Dashboard</p>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        <div className="bg-white/5 border border-white/10 p-6 lg:p-10">
          <h2 className="font-display text-white text-xl lg:text-2xl font-bold mb-6 lg:mb-8">Sign In</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-sm px-4 py-3 mb-5">{error}</div>
          )}

          <div className="space-y-4 lg:space-y-5">
            <div>
              <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                placeholder="••••••••" />
            </div>
            <button onClick={handleLogin} disabled={loading}
              className="w-full bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase py-4 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
