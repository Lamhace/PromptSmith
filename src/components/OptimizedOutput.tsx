import React, { useState } from 'react';
import { OptimizedPromptResult } from '../types';
import { Copy, Check, Code2, Layers, FileText, Download } from 'lucide-react';

interface OptimizedOutputProps {
  optimized: OptimizedPromptResult;
}

export const OptimizedOutput: React.FC<OptimizedOutputProps> = ({ optimized }) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'raw' | 'code'>('structured');
  const [activeLang, setActiveLang] = useState<'openai' | 'gemini' | 'langchain' | 'python'>('openai');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([optimized.fullPromptText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-prompt-${optimized.preset}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#111827]/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col h-full">
      
      {/* Top Header & Tab Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-2">
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('structured')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'structured'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Sections</span>
          </button>

          <button
            onClick={() => setActiveTab('raw')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'raw'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Standardized Text</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>API Code Integration</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs flex items-center space-x-1"
            title="Download as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleCopy(
              activeTab === 'code' 
                ? optimized.apiSnippets[activeLang] 
                : optimized.fullPromptText
            )}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/10"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto max-h-[520px] pr-1">
        
        {/* Tab 1: Structured Sections */}
        {activeTab === 'structured' && (
          <div className="space-y-4 text-xs">
            {/* System Persona */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 block">
                [1. System Role & Domain Persona]
              </span>
              <p className="text-slate-200 leading-relaxed font-mono">{optimized.sections.systemRole}</p>
            </div>

            {/* Context & Goals */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 block">
                [2. Context & Objectives]
              </span>
              <p className="text-slate-200 leading-relaxed">{optimized.sections.contextAndGoals}</p>
            </div>

            {/* Core Instructions */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-2 block">
                [3. Core Step-by-Step Instructions]
              </span>
              <ul className="space-y-1.5 text-slate-200">
                {optimized.sections.instructions.map((ins, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="font-mono text-purple-400 font-bold">{i + 1}.</span>
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negative Constraints */}
            <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-2 block">
                [4. Negative Constraints & Hallucination Guardrails]
              </span>
              <ul className="space-y-1.5 text-slate-200">
                {optimized.sections.negativeConstraints.map((nc, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-400">🛡️</span>
                    <span>{nc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Format */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1 block">
                [5. Enforced Output Schema / Structure]
              </span>
              <pre className="font-mono text-slate-300 text-[11px] whitespace-pre-wrap bg-slate-950 p-2.5 rounded-lg border border-slate-800 mt-1">
                {optimized.sections.outputFormat}
              </pre>
            </div>

            {/* Few Shot Demonstration if present */}
            {optimized.sections.fewShotExample && (
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1 block">
                  [6. Canonical Few-Shot Example]
                </span>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500">Input: </span>
                    <span className="text-slate-300">{optimized.sections.fewShotExample.input}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Output:</span>
                    <pre className="text-emerald-300 mt-0.5 whitespace-pre-wrap">{optimized.sections.fewShotExample.output}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Raw Full Text */}
        {activeTab === 'raw' && (
          <div className="relative">
            <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed">
              {optimized.fullPromptText}
            </pre>
          </div>
        )}

        {/* Tab 3: API Code Integration */}
        {activeTab === 'code' && (
          <div className="space-y-3">
            {/* Language Selector */}
            <div className="flex space-x-2 border-b border-slate-800 pb-2">
              {(['openai', 'gemini', 'langchain', 'python'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-all ${
                    activeLang === lang
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
              {optimized.apiSnippets[activeLang]}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};
