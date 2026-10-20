import React from 'react';
import { BattleResult } from '../types';
import { Swords, CheckCircle2, XCircle, Cpu, ArrowRight } from 'lucide-react';

interface BattleArenaProps {
  battle: BattleResult;
  onRerun: () => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({ battle, onRerun }) => {
  return (
    <div className="bg-[#111827]/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Prompt Battle Arena (A/B Test)</h3>
            <p className="text-xs text-slate-400">Side-by-side empirical comparison: Raw Prompt vs. PromptSmith Optimized</p>
          </div>
        </div>

        <button
          onClick={onRerun}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30 transition-all"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Re-Simulate Execution</span>
        </button>
      </div>

      {/* Side-by-Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Column 1: Raw Prompt Output */}
        <div className="rounded-xl bg-slate-900/90 border border-rose-500/30 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="font-semibold text-xs text-slate-200">Raw / Unconstrained Prompt</span>
              </div>
              <span className="text-[11px] text-rose-400 font-mono">Unstructured</span>
            </div>

            {/* Output Display */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed min-h-[220px]">
              {battle.rawOutput}
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 block">Format Compliance:</span>
              <span className="text-rose-400 font-semibold flex items-center space-x-1">
                <XCircle className="w-3 h-3 inline mr-1" />
                {battle.rawMetrics.formatCompliance}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Hallucination Risk:</span>
              <span className="text-rose-400 font-semibold">{battle.rawMetrics.hallucinationRisk}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Optimized Output */}
        <div className="rounded-xl bg-slate-900/90 border border-emerald-500/40 p-4 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-xs text-emerald-300">PromptSmith Optimized (Guarded)</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">Production Grade</span>
            </div>

            {/* Output Display */}
            <div className="p-3 bg-slate-950 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-200 whitespace-pre-wrap leading-relaxed min-h-[220px]">
              {battle.optimizedOutput}
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 block">Format Compliance:</span>
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 inline mr-1" />
                {battle.optimizedMetrics.formatCompliance}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Hallucination Risk:</span>
              <span className="text-emerald-400 font-semibold">{battle.optimizedMetrics.hallucinationRisk}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Analytical Takeaway Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-transparent border border-emerald-500/20 flex items-start space-x-3">
        <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
          <ArrowRight className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block mb-0.5">Prompt Engineering Impact Analysis:</span>
          <p className="text-xs text-slate-300 leading-relaxed">{battle.keyTakeaway}</p>
        </div>
      </div>

    </div>
  );
};
