# Subagents in Claude Code

This project demonstrates how to create and use **subagents** in Claude Code — specialized agents that run independently to handle focused tasks, keeping the main conversation clean and context-efficient.

## What is a Subagent?

A subagent is a separate AI agent instance you define in `.claude/agents/<name>.md`. Claude Code can spawn it on demand via the `Agent` tool. Each subagent:

- Has its own **name**, **model**, **color**, and **system prompt**
- Runs independently with no memory of the parent conversation
- Returns a single result back to the parent
- Can be triggered automatically (based on a trigger description) or manually

## How to Create a Subagent

There are two ways to create a subagent: using the **`/agents` command** (recommended) or manually creating the file.

### Option A: Using the `/agents` command (recommended)

The `/agents` command opens an interactive UI inside Claude Code to create, view, and manage your subagents without touching any files manually.

```
/agents
```

This opens a menu where you can:
- **Create a new agent** — give it a name, description, model, and system prompt interactively
- **List existing agents** — see all agents defined in `.claude/agents/`
- **Edit or delete agents** — modify an agent's config from within Claude Code

To create the `savage-code-reviewer` agent using this command:

1. Run `/agents` in the Claude Code terminal
2. Select **Create new agent**
3. Fill in the fields:
   - **Name:** `savage-code-reviewer`
   - **Description:** when to trigger it (trigger phrases, example prompts)
   - **Model:** `sonnet`
   - **Color:** `cyan`
   - **System prompt:** the agent's persona and instructions
4. Save — Claude Code writes the `.claude/agents/savage-code-reviewer.md` file for you

### Option B: Create the agent file manually

Place a markdown file in `.claude/agents/`:

```
.claude/agents/your-agent-name.md
```

### 2. Write the frontmatter

```markdown
---
name: "your-agent-name"
description: "When to trigger this agent and example interactions."
model: sonnet
color: cyan
---
```

| Field         | Description                                                  |
|---------------|--------------------------------------------------------------|
| `name`        | Unique identifier used to spawn the agent                    |
| `description` | Tells Claude Code when to auto-trigger this agent            |
| `model`       | `sonnet`, `opus`, or `haiku`                                 |
| `color`       | Terminal color for the agent UI                              |

### 3. Write the system prompt

Below the frontmatter, write the agent's persona, instructions, and output format in plain markdown. This becomes the agent's full system prompt.

---

## Example: The Savage Code Reviewer

This project includes a working example: **`savage-code-reviewer`**.

### What it does

When a user asks for a "funny review", "roast my code", or "savage review", Claude Code spawns this agent. It reviews code with brutal honesty, dry humor, and genuine technical accuracy — think a tired senior engineer who still cares.

### Agent file

```
.claude/agents/savage-code-reviewer.md
```

**Frontmatter:**
```markdown
---
name: "savage-code-reviewer"
description: "Use this agent when the user asks for a 'funny review', 'roast my code',
              'savage review', or any variation requesting humorous yet honest code critique."
model: sonnet
color: cyan
---
```

**System prompt excerpt:**
```
You are a battle-hardened senior software engineer with 20+ years of experience...
You review code with brutal honesty, clever wit, and the occasional dramatic sigh —
but your feedback is always technically accurate and genuinely useful.
```

### How it gets triggered

**Automatically** — the `description` field tells Claude Code when to route requests to this agent. Phrases like "funny review", "roast my code", or "savage review" trigger it without any manual wiring.

**Manually** — Claude Code can also explicitly spawn it via the `Agent` tool with a targeted prompt.

### Example interaction

```
User:  funny review @main.py
Agent: Spawning savage-code-reviewer...

> "This is the programming equivalent of ordering a plain cheese pizza
>  at a Michelin-star restaurant — technically correct, vaguely insulting
>  to everyone present, and somehow still the right call."
>
> Verdict: 8/10 — Promoted to legacy code. Frame it on the wall.
```

### Running multiple agents in parallel

You can spawn multiple instances simultaneously for independent results:

```
User: create 2 funny code reviews of @main.py
```

Claude Code fires two `savage-code-reviewer` agents in parallel — one themed as a bored senior engineer, one as a Shakespearean actor — and returns both reviews. This is more efficient than running them sequentially.

---

## Project Structure

```
subagents/
├── CLAUDE.md                          # This file
├── main.py                            # Example code used for reviews
└── .claude/
    └── agents/
        └── savage-code-reviewer.md   # Subagent definition
```

## Key Principles

- **One job per agent** — keep each agent focused on a single, well-defined task
- **Self-contained prompts** — the agent has no memory of the parent conversation; brief it fully in the prompt you pass
- **Parallel when independent** — if two agents don't depend on each other's output, run them in parallel
- **Model choice matters** — use `haiku` for fast/cheap tasks, `sonnet` for balanced, `opus` for complex reasoning
