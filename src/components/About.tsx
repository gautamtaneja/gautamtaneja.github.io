import React from 'react';
import { Layers, ShieldCheck, Cpu, Database, Cloud, GitPullRequest } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export const About: React.FC = () => {
  return (
    <section id="about" aria-label="About Gautam Taneja" className="py-20 bg-slate-100/60 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center sm:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>01. ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering Rigor Meets Full-Stack Ownership
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Biography */}
          <div className="lg:col-span-7 space-y-5 leading-relaxed text-base sm:text-lg">
            {portfolioConfig.personal.bio.map((paragraph, index) => (
              <p key={index} className="text-slate-700 dark:text-slate-300">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-sm">
                <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 font-semibold mb-1 text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>Systems & Performance</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Focusing on latency reduction, throughput, CQRS read optimization, and eliminating bottleneck queries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 shadow-sm">
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold mb-1 text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>API Security & Auth</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Implementing JWT, OAuth2, OIDC flows, granular RBAC, and resilient integration boundaries.
                </p>
              </div>
            </div>
          </div>

          {/* Minimalist Technical Architecture Visual (SVG / CSS) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span>System Architecture Focus</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Clean Arch</span>
              </div>

              {/* Architectural Layers Diagram */}
              <div className="space-y-3 font-mono text-xs">
                {/* Client Layer */}
                <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>Presentation Layer</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">React • Angular • Tailwind</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400 dark:text-slate-600">
                  <GitPullRequest className="w-3.5 h-3.5 rotate-90" />
                </div>

                {/* API & Domain Layer */}
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                    <span>API & Core Services</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">ASP.NET Core • REST • JWT</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400 dark:text-slate-600">
                  <GitPullRequest className="w-3.5 h-3.5 rotate-90" />
                </div>

                {/* Data & Query Layer */}
                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-semibold">
                    <Database className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Data Persistence</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Dapper (Reads) + EF (Writes)</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400 dark:text-slate-600">
                  <GitPullRequest className="w-3.5 h-3.5 rotate-90" />
                </div>

                {/* Cloud & Infrastructure */}
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                    <Cloud className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Cloud & Deployment</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Docker • Azure • AWS • CI/CD</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Location: India</span>
                <span className="text-sky-600 dark:text-sky-400 font-mono font-medium">Full-Stack Lifecycle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
