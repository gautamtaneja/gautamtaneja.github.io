import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-tight">
                {portfolioConfig.personal.name}
              </div>
              <div className="text-xs text-slate-400">
                {portfolioConfig.personal.title}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioConfig.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioConfig.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors ml-2"
            >
              <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Tech Stack & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {portfolioConfig.personal.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <span>Built with React, TypeScript & Tailwind CSS</span>
            <span>•</span>
            <span>Zero-Cost Serverless with Google Apps Script</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">₹0 Recurring</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
