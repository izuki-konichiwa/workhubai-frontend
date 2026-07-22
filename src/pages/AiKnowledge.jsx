import React, { useState } from "react";
import { Sparkles, FileText, Send, ArrowRight, BookOpen } from "lucide-react";

export default function AiKnowledge() {
  const [query, setQuery] = useState("");

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* AI Assistant Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" /> AI Department Intelligence
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Ask WorkHub Knowledge Base
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Instantly query department guidelines, exam policies, meeting minutes, and accreditation standards.
        </p>
      </div>

      {/* AI Query Search Box */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl shadow-indigo-500/5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. What is the syllabus revision policy for 2026?"
          className="w-full pl-4 pr-12 py-3 text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          "Summarize HOD meeting minutes from last week",
          "What are the leave application guidelines?",
          "List pending accreditation documents",
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setQuery(prompt)}
            className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-left hover:border-indigo-500 transition-all text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between group"
          >
            <span>{prompt}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}