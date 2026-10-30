import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export const Experience: React.FC = () => {
  return (
    <section id="experience" aria-label="Professional Experience" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center sm:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>02. CAREER HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Professional Experience & Track Record
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Demonstrated history of engineering high-availability full-stack systems, optimizing backend services, and leading features from design to production.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300 dark:border-slate-800 space-y-12">
          {portfolioConfig.experiences.map((exp, index) => {
            const isCurrent = index === 0;
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Node Bullet */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    isCurrent
                      ? 'bg-sky-500 border-sky-300 ring-4 ring-sky-500/20 shadow-lg shadow-sky-500/40'
                      : 'bg-slate-300 border-slate-400 dark:bg-slate-900 dark:border-slate-600'
                  }`}
                />

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {exp.role}
                        </h3>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-500/30">
                            Current Role
                          </span>
                        )}
                      </div>
                      <div className="text-base font-semibold text-sky-600 dark:text-sky-400">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <div className="inline-flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bullet Achievements */}
                  <div className="space-y-2.5 mb-6">
                    {exp.achievements.map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
