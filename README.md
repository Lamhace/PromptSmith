# PromptSmith Studio ⚡
### Enterprise AI Prompt Engineering, Quality Auditing & Evaluation Suite

**PromptSmith** is a production-grade developer tool designed to transform ambiguous, raw user prompts into structured, hallucination-resistant, schema-validated prompt architectures.

Built by **Ojo Oladimeji** ([Portfolio](https://ojooladimeji.vercel.app/) · [GitHub](https://github.com/Lamhace)).

---

## 🚀 Key Features

* **Real-Time Heuristic Quality Audit:**
  * Computes a 0–100 Prompt Quality Score based on prompt engineering heuristics.
  * Granular metrics for **Clarity & Persona**, **Negative Constraints (Guardrails)**, **Output Schema Specification**, and **Few-Shot Demonstrations**.
  * Dynamic Hallucination Risk assessment (Low / Medium / High).
* **Deterministic Optimization Engine:**
  * Converts unstructured requests into standardized prompt frameworks:
    * `[SYSTEM ROLE]` — Domain persona anchoring
    * `[CONTEXT & OBJECTIVES]` — Operational scope definition
    * `[CORE INSTRUCTIONS]` — Step-by-step procedural directions
    * `[NEGATIVE CONSTRAINTS]` — Guardrails preventing hallucination, conversational drift, and unauthorized disclosure
    * `[OUTPUT SPECIFICATION]` — Strict schema (JSON / Markdown / Typings)
    * `[FEW-SHOT DEMONSTRATIONS]` — Input-output pairs for deterministic adherence
* **6 Optimization Target Presets:**
  * ⚡ **Code & Systems:** Strict typing, algorithmic complexity, test cases, no preamble.
  * 📊 **JSON Extraction:** RFC 8259 strict compliance, null fallbacks, schema validation.
  * 🛡️ **Agent Guardrails:** Brand voice adherence, policy boundaries, escalation paths.
  * 🧠 **Reasoning & CoT:** Scratchpad derivation, formal axioms, boundary condition proofs.
  * ✍️ **Conversion Copywriting:** Direct-response frameworks, hook & pain-point formulas.
  * 🌐 **General Pro:** Universal structured prompt architecture.
* **Side-by-Side Prompt Battle Arena (A/B Testing):**
  * Live empirical comparison of raw vs. optimized outputs.
  * Quantifiable metrics on format compliance, hallucination risk, token consumption, and latency.
* **Battle-Tested Prompt Vault:**
  * Pre-loaded library of real-world enterprise prompt templates (SQL generator, invoice parser, smart contract auditor, support triage).
* **Multi-SDK Code Export:**
  * 1-click production-ready code generation for **OpenAI SDK (GPT-4o)**, **Google Gemini API**, **LangChain**, and **Python**.

---

## 🛠️ Tech Stack

* **Framework:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS, PostCSS, Lucide React
* **Deployment Target:** Vercel / Netlify

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/Lamhace/PromptSmith.git

# Navigate into the project
cd PromptSmith

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License
MIT License. Created by Ojo Oladimeji.
