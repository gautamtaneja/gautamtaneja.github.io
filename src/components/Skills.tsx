import React from 'react';
import { Server, Layout, Database, Cloud, Compass, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

const CATEGORY_ICONS = [
  Server,    // Backend
  Layout,    // Frontend
  Database,  // Databases
  Cloud,     // Cloud & DevOps
  Compass,   // Architecture & Practices
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" aria-label="Technical Skills" className="py-20 bg-slate-100/60 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center sm:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03. TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Competencies & Technology Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            A versatile, engineering-first capability spanning high-performance backend architecture, modern reactive frontends, resilient data stores, and automated cloud pipelines.
          </p>
        </div>

        {/* 5 Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.skills.map((category, index) => {
            const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
            const isFullWidthSpan = index === 4;

            return (
              <div
                key={category.title}
                className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between shadow-sm dark:shadow-lg dark:shadow-black/10 group ${
                  isFullWidthSpan ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          skill.highlight
                            ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-600/40 font-semibold shadow-sm shadow-sky-900/10'
                            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500'
                        }`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{category.skills.length} Capabilities</span>
                  <span className="text-sky-600 dark:text-sky-400/80 font-medium">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
