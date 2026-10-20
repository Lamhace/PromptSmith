import React from 'react';
import { PromptTemplate } from '../types';
import { PROMPT_TEMPLATES } from '../data/templates';
import { X, BookOpen, ArrowRight } from 'lucide-react';

interface TemplateVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PromptTemplate) => void;
}

export const TemplateVaultModal: React.FC<TemplateVaultModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white">Battle-Tested Prompt Vault</h2>
              <p className="text-xs text-slate-400">Curated enterprise-grade prompt engineering templates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMPT_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => {
                onSelectTemplate(tmpl);
                onClose();
              }}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {tmpl.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-emerald-400 flex items-center space-x-1">
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                  {tmpl.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {tmpl.description}
                </p>
              </div>

              <div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800/80 mb-3 font-mono text-[11px] text-slate-300 line-clamp-2">
                  "{tmpl.rawPrompt}"
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {tmpl.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
