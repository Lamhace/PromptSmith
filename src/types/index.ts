export type OptimizationPreset = 
  | 'general'
  | 'coding'
  | 'structured_json'
  | 'copywriting'
  | 'agent_guardrails'
  | 'chain_of_thought';

export interface PromptMetrics {
  score: number;
  clarity: number;
  constraints: number;
  fewShot: number;
  outputStructure: number;
  hallucinationRisk: 'Low' | 'Medium' | 'High';
  estimatedTokens: number;
}

export interface PromptAnalysis {
  metrics: PromptMetrics;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface OptimizedSections {
  systemRole: string;
  contextAndGoals: string;
  instructions: string[];
  negativeConstraints: string[];
  outputFormat: string;
  fewShotExample?: {
    input: string;
    output: string;
  };
}

export interface OptimizedPromptResult {
  preset: OptimizationPreset;
  sections: OptimizedSections;
  fullPromptText: string;
  analysis: PromptAnalysis;
  apiSnippets: {
    openai: string;
    gemini: string;
    langchain: string;
    python: string;
  };
}

export interface BattleResult {
  rawOutput: string;
  optimizedOutput: string;
  rawMetrics: {
    formatCompliance: string;
    hallucinationRisk: string;
    estimatedTokens: number;
    latencyMs: number;
  };
  optimizedMetrics: {
    formatCompliance: string;
    hallucinationRisk: string;
    estimatedTokens: number;
    latencyMs: number;
  };
  keyTakeaway: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Engineering' | 'Extraction' | 'Agents' | 'Marketing' | 'Reasoning';
  description: string;
  preset: OptimizationPreset;
  rawPrompt: string;
  tags: string[];
}
