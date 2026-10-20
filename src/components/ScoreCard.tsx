import React from 'react';
import { PromptAnalysis } from '../types';
import { AlertTriangle, Lightbulb, Zap } from 'lucide-react';

interface ScoreCardProps {
  analysis: PromptAnalysis;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ analysis }) => {
  const { metrics, weaknesses, recommendations } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getRiskBadge = (risk: 'Low' | 'Medium' | 'High') => {
    if (risk === 'Low') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (risk === 'Medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  };

  return (
    <div className="bg-[#111827]/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center space-x-2.5">
          <Zap className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-white text-base">Prompt Quality Audit</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Hallucination Risk:</span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getRiskBadge(metrics.hallucinationRisk)}`}>
            {metrics.hallucinationRisk}
          </span>
        </div>
      </div>

      {/* Main Score & Metrics Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center mb-6">
        
        {/* Overall Score Dial */}
        <div className="sm:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(metrics.score)} mb-2`}>
            <span className="text-3xl font-extrabold tracking-tight">{metrics.score}</span>
            <span className="text-[10px] uppercase font-semibold text-slate-400">/ 100</span>
          </div>
          <span className="text-xs font-medium text-slate-300">Overall Prompt Score</span>
          <span className="text-[11px] text-slate-500 mt-0.5">Est. Tokens: {metrics.estimatedTokens}</span>
        </div>

        {/* Detailed Heuristic Progress Bars */}
        <div className="sm:col-span-3 space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Clarity & Persona</span>
              <span className="font-mono text-slate-200">{metrics.clarity}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${metrics.clarity}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Negative Constraints & Guardrails</span>
              <span className="font-mono text-slate-200">{metrics.constraints}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${metrics.constraints}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Output Schema & Formatting</span>
              <span className="font-mono text-slate-200">{metrics.outputStructure}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${metrics.outputStructure}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Few-Shot Demonstrations</span>
              <span className="font-mono text-slate-200">{metrics.fewShot}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${metrics.fewShot}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Insights: Strengths, Weaknesses, Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Identified Weaknesses */}
        <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20">
          <div className="flex items-center space-x-1.5 font-semibold text-rose-400 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Identified Flaws ({weaknesses.length})</span>
          </div>
          <ul className="space-y-1.5 text-slate-300">
            {weaknesses.map((w, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <span className="text-rose-400">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Engineering Recommendations */}
        <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center space-x-1.5 font-semibold text-emerald-400 mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Optimization Fixes ({recommendations.length})</span>
          </div>
          <ul className="space-y-1.5 text-slate-300">
            {recommendations.map((r, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <span className="text-emerald-400">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
