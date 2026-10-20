import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'sql-generator',
    title: 'PostgreSQL Query Generator & Safety Validator',
    category: 'Engineering',
    description: 'Transform natural language business questions into optimized, injection-safe SQL queries with explain plans.',
    preset: 'coding',
    rawPrompt: 'Write a postgres query to get the top 5 customers by revenue last month who have never returned an item.',
    tags: ['SQL', 'PostgreSQL', 'Database', 'Backend']
  },
  {
    id: 'json-extractor',
    title: 'Unstructured Invoice to Strict JSON Extractor',
    category: 'Extraction',
    description: 'Parse noisy receipt text or invoice OCR into a schema-validated, type-safe JSON object.',
    preset: 'structured_json',
    rawPrompt: 'Extract the invoice number, date, vendor name, line items, and total amount from this receipt text.',
    tags: ['JSON Schema', 'Extraction', 'OCR', 'Data Pipeline']
  },
  {
    id: 'code-auditor',
    title: 'Smart Contract & React Code Reviewer',
    category: 'Engineering',
    description: 'Audit code for security vulnerabilities, race conditions, memory leaks, and reentrancy bugs.',
    preset: 'coding',
    rawPrompt: 'Review this React component for performance issues and re-renders when fetching data.',
    tags: ['Code Review', 'React', 'TypeScript', 'Security']
  },
  {
    id: 'agent-triage',
    title: 'Customer Support Escalation & Sentiment Agent',
    category: 'Agents',
    description: 'Autonomous customer tier triage agent with fallback guardrails and empathetic calibration.',
    preset: 'agent_guardrails',
    rawPrompt: 'You are a support agent. Reply to angry users complaining about a delayed delivery and calm them down.',
    tags: ['Agents', 'Guardrails', 'Support', 'NLP']
  },
  {
    id: 'cot-debugger',
    title: 'Step-by-Step Chain-of-Thought Algorithmic Debugger',
    category: 'Reasoning',
    description: 'Enforces scratchpad reasoning and mathematical verification before outputting a solution.',
    preset: 'chain_of_thought',
    rawPrompt: 'Solve this distributed system split-brain problem and calculate the quorum percentage.',
    tags: ['Reasoning', 'CoT', 'Math', 'Architecture']
  },
  {
    id: 'copy-landing',
    title: 'B2B SaaS Landing Page Hero Section Copy',
    category: 'Marketing',
    description: 'Craft high-converting headline, subhead, and value propositions following the StoryBrand framework.',
    preset: 'copywriting',
    rawPrompt: 'Write a landing page hero section for an AI hiring tool that saves recruiters 15 hours a week.',
    tags: ['Copywriting', 'Conversion', 'SaaS', 'Marketing']
  }
];
