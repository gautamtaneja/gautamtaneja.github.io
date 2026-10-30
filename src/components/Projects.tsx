import React from 'react';
import { FolderGit2, ExternalLink, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  return (
    <section id="projects" aria-label="Featured Projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center sm:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>04. FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Architecture Case Studies & Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Selected engineering initiatives demonstrating system design, database optimization, resilient payment flows, and full-stack ownership.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {portfolioConfig.projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 shadow-md dark:shadow-xl dark:shadow-black/20 group"
            >
              <div>
                {/* Header: Category & Privacy/Links */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.isConfidential ? (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/60"
                        title="Commercial project with confidential intellectual property."
                      >
                        <Lock className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                        <span>Enterprise IP</span>
                      </span>
                    ) : (
                      <>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source code for ${project.title}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Live demo for ${project.title}`}
                            className="p-1.5 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Engineering Challenges */}
                <div className="mb-5 p-3.5 rounded-xl bg-amber-50/50 dark:bg-slate-950/60 border border-amber-200/80 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Engineering Challenges</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.challenges.map((challenge, cIdx) => (
                      <li key={cIdx} className="text-xs text-slate-700 dark:text-slate-300 leading-normal pl-2 border-l-2 border-amber-500/50">
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Contributions */}
                <div className="mb-6 space-y-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
                    Key Contributions:
                  </span>
                  {project.contributions.map((contribution, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{contribution}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Tech Stack & Metrics */}
              <div>
                {project.metrics && (
                  <div className="mb-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{project.metrics.label}:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{project.metrics.value}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
