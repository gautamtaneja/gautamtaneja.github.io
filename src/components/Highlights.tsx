import React from 'react';
import { Zap, Clock, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export const Highlights: React.FC = () => {
  return (
    <section aria-label="Engineering Highlights" className="py-16 bg-slate-100/80 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>MEASURABLE IMPACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Engineering Highlights & Production Benchmarks
          </h2>
        </div>

        {/* Latency Spotlight Banner */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50/50 to-sky-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-sky-200 dark:border-sky-500/20 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <TrendingUp className="w-3.5 h-3.5" /> Production Optimization Case Study
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                API Response Latency Slashed by 60%
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                On Imperans SaaS, decoupling heavy ORM read paths and adopting Dapper for high-frequency queries alongside Redis caching cut critical endpoint response times from 1.2s to 450ms.
              </p>
            </div>

            {/* Visual Comparison Bar */}
            <div className="bg-white dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 min-w-[280px] shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Before (EF Core Tracking)</span>
                <span className="font-mono text-rose-500 dark:text-rose-400 font-bold">~1,200ms</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 mb-3">
                <div className="bg-rose-500 h-2.5 rounded-full w-[100%]" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>After (Dapper CQRS Read-Path)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">450ms (-60%)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full w-[37.5%]" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioConfig.highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-1 group shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                  {item.badge}
                </span>
                {index === 0 && <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-sky-500 transition-colors" />}
                {index === 1 && <Zap className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors" />}
                {index === 2 && <ShieldCheck className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />}
                {index === 3 && <CheckCircle2 className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                {item.value}
              </div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
