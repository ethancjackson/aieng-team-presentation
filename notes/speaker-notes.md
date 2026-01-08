# Speaker Notes

## Slide 0: Title
- Welcome everyone, thank you for having me
- I'm excited to share my research background and vision for our work together
- This presentation is a tour of my recent research, but with a focus on where we might go from here

---

## Slide 1: About Me
- Quick journey through my career
- Notice the recurring themes: evolutionary methods, memory systems, social AI
- From Western → Guelph → Vector (first time) → Toronto Psych → ChainML → back to Vector
- Each step built toward understanding how intelligent systems can learn and adapt

---

## Slide 2: Three Pillars for Aligned Agentic AI
- This is the core argument I want to make today
- The current paradigm — train once, RLHF into compliance — won't scale
- We need three things:
  1. **Memory**: Agents that can learn from experience over time
  2. **Plasticity**: Multiple modes of learning beyond gradient descent
  3. **Social environments**: Rich contexts where agents develop appropriate values
- These aren't nice-to-haves; I believe they're essential for aligned agentic AI

---

## Slide 3: The Memory Gap
- The Hendrycks et al. paper provides a rigorous framework for measuring AGI progress
- Based on Cattell-Horn-Carroll theory - the most validated model of human cognition
- GPT-5 scores 57% toward AGI - impressive, but look where the gaps are
- Almost all deficits are in memory-related dimensions
- This isn't a bug in the models; it's a fundamental architectural limitation

---

## Slide 4: The Question
- [Pause for effect]
- This question drove much of my work at U of T Psychology
- The brain has spent millions of years solving the memory problem
- What can we learn from that solution?

---

## Slide 5: Hippocampus Overview
- The hippocampus is remarkable - it sits at the top of the cortical hierarchy
- It can bind information from anywhere in the brain into coherent episodes
- The key regions each have specialized functions
- EC is the gateway in and out
- DG creates sparse, separated representations
- CA3 stores the core engram and enables pattern completion
- This architecture is an evolutionary solution to a fundamental tradeoff

---

## Slide 6: Pattern Separation & Completion
- These are the two fundamental operations of episodic memory
- Pattern separation: making similar things distinct (was it Tuesday or Wednesday?)
- Pattern completion: recalling the whole from a part (the meeting where X happened)
- Too much separation and you can't generalize
- Too much completion and memories interfere
- The hippocampus balances both through its anatomy

---

## Slide 7: Hippocampal DNN
- This is how we translate the biology into neural network architecture
- Complementary learning systems: SLOW neocortex + FAST hippocampus
- The key insight: you need separate systems for gradual learning vs. rapid encoding
- This has parallels to how we might design memory for AI agents

---

## Slide 8: Distributed TD Learning
- This is about making learning itself more biologically plausible
- Standard backprop requires global error signals - the brain doesn't work this way
- Distributed TD learning gives each layer its own local error signal
- Think of it as "artificial dopamine" - local rewards, not global errors
- [Paper citation: NeurIPS 2024]
- This has implications for how we might build more robust learning systems

---

## Slide 9: Engineering Episodic Memory for Agents
- Now let's connect this to practical systems
- We don't need hippocampal DNN modules - RAG-based architectures work too
- Two phases that mirror biological memory:
  - **Retrieval** (fast recall) - pattern completion
  - **Consolidation** (slow learning) - post-interaction memory updates
- The key question I want to explore: What would AGI benchmarks look like for memory-enabled agents?
- There's actually new work on this: EpBench — an episodic memory benchmark

---

## Slide 10: Three Modes of Plasticity
- Here's where I want to talk about learning more broadly
- There are three basic modes of plasticity for agents:
  1. **Weights** (slow): Pre-training, fine-tuning, RLHF, ES
  2. **Adapters** (medium): LoRA, ES-based optimization, evolutionary program search
  3. **External Memory** (fast): RAG, episodic stores, pattern completion
- Key insight: RL isn't the only option for adaptation
- Evolutionary strategies provide low-variance, scalable alternatives
- This is especially important for agentic systems where gradient signals are sparse

---

## Slide 11: Why Agents Need Rich Social Environments
- Now I want to make an argument about WHY social environments matter
- Social AI is an emerging field - Tomašev et al. call it "Virtual Agent Economies"
- Our PNAS Nexus paper showed: PPO-trained agents develop emergent stereotyping from pure reward optimization
- No individual agent is "biased" — but the system develops harmful patterns
- The privacy problem: agents that learn from experience introduce privacy concerns
- Humans learn to NOT leak private information through social consequences
- How do we teach agents the same?
- Core argument: "learn everything at once, then RLHF" can't produce agents that develop values through social experience with real consequences

---

## Slide 12: Evolutionary Program Search
- This is exciting recent work connecting evolution to program search
- Darwin Gödel Machine: self-improving coding agents via evolutionary search
- ProFiT: same principle applied to trading programs in Python
- Key insight: policies aren't just LLM prompts — they can be DNNs, code, agent architectures
- This is research translation in action: Clune's DGM work at Vector has broad application potential

---

## Slide 13: ES vs RL
- This slide is a bit technical but important
- Evolution Strategies and RL are both optimization methods, but they work differently
- ES explores in parameter space - one noise sample per trajectory
- RL explores in action space - noise at every token
- ES has dramatically lower variance - and scales to 7B parameters with only N=30 population members
- [Citation: Qiu et al., 2025]
- Connection to my PhD work: I extended Such et al. (2017) on neuroevolution for Atari

---

## Slide 14: From Game Agents to LLM Fine-Tuning
- This is where I want to make a connection across scales
- 2017-2019: Game agents with ~1M parameters, N=10,000+ population
- 2025: LLMs with 7B parameters, N=30 population
- Why does N=30 work? Low intrinsic dimensionality
- Landscape smoothing: ES effectively smooths the reward landscape through Gaussian convolution
- Open research: can evolutionary methods unlock optimization for full agentic systems?

---

## Slide 15: Applied Research Agenda
- Here's where I want to get concrete about what we might do at Vector
- Three directions that connect back to my research:
  1. **Agentic Evals & Benchmarks**: Apply evals to agentic systems, not just models (connects to memory slides)
  2. **Multi-Modal Plasticity**: ES and evolutionary program search, even with frozen LLMs (connects to ES/DGM slides)
  3. **Social AI**: Privacy-preserving learning, multi-agent coordination (connects to social slides)
- These three directions intersect: benchmarks provide training environments, plasticity modes provide learning pathways, social settings provide rich feedback

---

## Slide 16: Research Translation Impact
- Let me give some concrete examples of research → application
- EpBench → Evaluate memory-augmented agents for enterprise workflows
- Darwin Gödel Machine → Optimize agent scaffolding, prompts, tool configurations automatically
- Virtual Agent Economies → Test and validate multi-agent systems before real-world deployment
- [Key references listed on slide]

---

## Slide 17: Closing
- [Return to thesis]
- The current paradigm — train once, RLHF into compliance — won't scale
- We need agents that remember, multiple modes of plasticity, and rich social environments
- This is the research I'm here to do
- I'm excited to be here and to collaborate with all of you
- Questions?
