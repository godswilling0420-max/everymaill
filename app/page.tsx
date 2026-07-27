"use client";

import { useActionState } from "react";
import { handleSignIn, FormState } from "./actions";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

const initialState: FormState = {
  success: false,
  message: "",
};

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(handleSignIn, initialState);

  return (
    <main className="min-h-screen bg-white text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <nav className="absolute top-0 left-0 w-full p-4 flex items-center justify-center z-10">
        <Image
          src="/Everymail_logo.svg"
          alt="Logo"
          width={200}
          height={100}
        />
      </nav>
      <div className="w-full max-w-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-black">Sign In</h1>
        </div>

        <form action={formAction} className="space-y-5">
          

          <div>
            <label htmlFor="email" className="block text-xs font-semibold  tracking-wider text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3  border border-black rounded-xl placeholder-slate-600 text-black text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold  tracking-wider text-black  mb-2">
              Password
            </label>
            <input
              type="password"
              id="name"
              name="name"
              required
              placeholder="password"
              className="w-full px-4 py-3  border border-black rounded-xl placeholder-slate-600  focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-black text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 bg-[#C13EF7]  text-white font-semibold rounded-xl transition-all shadow-lg  active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thanks for your joining us</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {state.message && (
          <div
            className={`mt-6 p-3.5 rounded-xl border flex items-center gap-3 text-xs font-medium ${
              state.success
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{state.message}</span>
          </div>
        )}
      </div>
    </main>
  );
}