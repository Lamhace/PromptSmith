import React, { useState, useMemo } from 'react';
import { OptimizationPreset, PromptTemplate } from './types';
import { generateOptimizedPrompt, simulateBattle } from './services/optimizer';
import { Navbar } from './components/Navbar';
import { ScoreCard } from './components/ScoreCard';
import { OptimizedOutput } from './components/OptimizedOutput';
import { BattleArena } from './components/BattleArena';
import { TemplateVaultModal } from './components/TemplateVaultModal';
import { 
  Sparkles, 
  Terminal, 
  Code, 
  Database, 
  ShieldCheck, 
  BrainCircuit, 
  PenTool, 
  Layers
} from 'lucide-react';

const PRESETS: { id: OptimizationPreset; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
  { id: 'coding', label: 'Code & Systems', icon: Code, desc: 'Strict typing, no conversational filler, edge cases' },
  { id: 'structured_json', label: 'JSON Extraction', icon: Database, desc: 'RFC 8259 schema validation, zero hallucinations' },
  { id: 'agent_guardrails', label: 'Agent Guardrails', icon: ShieldCheck, desc: 'Safety bounds, role adherence, policy fallbacks' },
  { id: 'chain_of_thought', label: 'Reasoning & CoT', icon: BrainCircuit, desc: 'Scratchpad derivation, formal logic validation' },
  { id: 'copywriting', label: 'Copywriting', icon: PenTool, desc: 'Direct-response conversion, hook & pain-point framework' },
  { id: 'general', label: 'General Pro', icon: Layers, desc: 'Multi-tiered structured prompts for any domain' },
];

export default function App() {
  const [rawPrompt, setRawPrompt] = useState<string>(
    'Write a postgres query to get the top 5 customers by revenue last month who have never returned an item.'
  );
  const [selectedPreset, setSelectedPreset] = useState<OptimizationPreset>('coding');
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Compute live analysis and optimization
  const optimizedResult = useMemo(() => {
    return generateOptimizedPrompt(rawPrompt, selectedPreset);
  }, [rawPrompt, selectedPreset]);

  // Compute simulation battle result
  const battleResult = useMemo(() => {
    return simulateBattle(rawPrompt, optimizedResult);
  }, [rawPrompt, optimizedResult]);

  const handleSelectTemplate = (template: PromptTemplate) => {
    setRawPrompt(template.rawPrompt);
    setSelectedPreset(template.preset);
  };

  const tokenCount = Math.ceil(rawPrompt.length / 4);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans bg-grid-pattern">
      <Navbar onOpenTemplates={() => setIsVaultOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Prompt Engineering & Evaluation Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Transform Raw Prompts into <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Production AI Workflows</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Real-time heuristic quality auditing, hallucination guardrails, strict output schemas, and empirical side-by-side battle testing.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Select Optimization Target:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PRESETS.map((p) => {
              const Icon = p.icon;
              const isActive = selectedPreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPreset(p.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-500/10 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </div>
                  <span className="text-xs font-semibold block">{p.label}</span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Workstation: Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Prompt & Score Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Raw Prompt Input Card */}
            <div className="bg-[#111827]/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-semibold text-sm text-white">Raw / Unoptimized Prompt</h3>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                  <span>{tokenCount} Tokens</span>
                  <span>•</span>
                  <span>{rawPrompt.length} Chars</span>
                </div>
              </div>

              <textarea
                value={rawPrompt}
                onChange={(e) => setRawPrompt(e.target.value)}
                placeholder="Paste or write your raw prompt here..."
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500/60 transition-colors resize-none placeholder-slate-600 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsVaultOpen(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  ⚡ Browse Prompt Templates
                </button>
                <div className="text-[11px] text-slate-500">
                  Live updates enabled
                </div>
              </div>
            </div>

            {/* Quality Scorecard & Heuristics Radar */}
            <ScoreCard analysis={optimizedResult.analysis} />

          </div>

          {/* Right Column: Optimized Output & Battle Arena (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <OptimizedOutput optimized={optimizedResult} />
          </div>

        </div>

        {/* Bottom Section: Side-by-Side Prompt Battle Arena */}
        <div className="pt-4">
          <BattleArena 
            battle={battleResult} 
            onRerun={() => {}} 
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 PromptSmith Studio — Engineered by Ojo Oladimeji</p>
          <div className="flex items-center space-x-4">
            <a href="https://ojooladimeji.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              Portfolio
            </a>
            <a href="https://hirespace-chi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              HireSpace
            </a>
            <a href="https://github.com/Lamhace" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Template Vault Modal */}
      <TemplateVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
