import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Briefcase, Zap, Terminal } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle Background Ambience (Deep Charcoal/Clean Slate, Mesh Grid & Radial Glows) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-sky-600/5 blur-[100px] rounded-full" />

        {/* Minimal Engineering SVG Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center sm:items-start space-y-6"
        >
          {/* Status & Experience Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Senior Engineering Roles
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/70 text-slate-700 dark:text-slate-300">
              <Briefcase className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              {portfolioConfig.personal.experienceYears} Experience
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/70 text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              {portfolioConfig.personal.location}
            </span>
          </motion.div>

          {/* Identity & Main Headline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h2 className="text-sm uppercase tracking-widest text-sky-600 dark:text-sky-400 font-mono font-semibold">
              {portfolioConfig.personal.title}
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="block text-slate-900 dark:text-slate-100">{portfolioConfig.personal.name}</span>
              <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-teal-500 dark:from-sky-400 dark:via-indigo-300 dark:to-teal-300 bg-clip-text text-transparent">
                {portfolioConfig.personal.headline}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle / Positioning */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed text-center sm:text-left"
          >
            {portfolioConfig.personal.subHeadline}
          </motion.p>

          {/* Key Tech Stack Chips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 pb-2"
          >
            {['.NET 8/10', 'C#', 'ASP.NET Core', 'React', 'TypeScript', 'Dapper', 'SQL Server', 'PostgreSQL', 'Azure', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Call to Actions & Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95 group"
            >
              <span>View Featured Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95"
            >
              <Mail className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              <span>Contact Me</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <a
                href={portfolioConfig.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                title="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={portfolioConfig.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Engineering Signal Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full pt-6 mt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
          >
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                ~5 Yrs
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Engineering Experience</p>
            </div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold font-mono text-sky-600 dark:text-sky-400">
                1.2s → 450ms
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Avg. API Response Optimization</p>
            </div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Clean Arch
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Domain-Driven & Scalable</p>
            </div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                Full-Stack
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">From Architecture to Production</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
