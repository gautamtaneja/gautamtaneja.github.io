import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" aria-label="Education" className="py-16 bg-slate-100/60 dark:bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05. ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education & Computer Science Foundation
          </h2>
        </div>

        <div className="space-y-6">
          {portfolioConfig.education.map((edu, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                    {edu.institution}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="inline-flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>

              {edu.description && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <p>{edu.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
