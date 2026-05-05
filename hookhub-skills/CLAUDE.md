# HookHub – Claude Code Skills Project

HookHub is a Next.js 15 app (App Router, TypeScript, Tailwind CSS 4) used as a sandbox for building and practising Claude Code skills.

## Launching the App

```bash
npm install          # first time only
npm run dev          # dev server → http://localhost:3000
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint check
```

Key source files:
- `src/app/page.tsx` – home page
- `src/app/layout.tsx` – root layout (fonts, metadata)
- `src/app/globals.css` – Anthropic brand tokens + Tailwind import
- `src/components/HookCard.tsx` – hook card component
- `src/data/hooks.json` – hook data

---

## Claude Code Skills

### What is a Skill?

A skill is a reusable slash command invoked as `/skill-name`. Each skill lives in its own folder containing a required `SKILL.md` file.

### Skill File Location

| Scope | Path |
|---|---|
| Project | `.claude/skills/<skill-name>/SKILL.md` |
| User (global) | `~/.claude/skills/<skill-name>/SKILL.md` |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` |

### SKILL.md Structure

Every skill requires a file named exactly `SKILL.md` (case-sensitive). YAML frontmatter is optional but recommended.

```
.claude/skills/my-skill/
└── SKILL.md           ← required
```

```markdown
---
name: my-skill
description: What this skill does and when Claude should use it.
argument-hint: "[topic]"
arguments: topic
allowed-tools: Bash, Read, Edit
---

# Skill instructions here

Use $topic (or $ARGUMENTS for all args) inside the body.
```

**Key frontmatter fields:**

| Field | Required | Purpose |
|---|---|---|
| `description` | Recommended | Tells Claude when to invoke the skill (max 1 536 chars) |
| `name` | No | Display name — lowercase, hyphens only, max 64 chars |
| `when_to_use` | No | Extra context appended to `description` |
| `argument-hint` | No | Autocomplete hint shown in the `/` menu |
| `arguments` | No | Named positional args for `$name` substitution |
| `allowed-tools` | No | Tools usable without permission prompts during the skill |
| `model` | No | Override the model for this skill |
| `effort` | No | `low` / `medium` / `high` / `max` |
| `context` | No | Set to `fork` to run in an isolated subagent |
| `shell` | No | `bash` (default) or `powershell` for `!` blocks |
| `user-invocable` | No | `false` hides the skill from the `/` menu |

**String substitutions inside the body:**

| Placeholder | Resolves to |
|---|---|
| `$ARGUMENTS` | All arguments passed at invocation |
| `$ARGUMENTS[N]` or `$N` | Specific argument by index |
| `$name` | Named argument (declared in `arguments`) |
| `${CLAUDE_SKILL_DIR}` | Directory containing `SKILL.md` |
| `${CLAUDE_SESSION_ID}` | Current session ID |

**Dynamic shell injection** — run a command before Claude reads the skill:

```markdown
Current diff:
!`git diff HEAD`

Summarise the changes above.
```

---

### Method 1 – Simple Skill

```
.claude/skills/summarise/SKILL.md
```

```markdown
---
description: Summarise the current file in three bullet points.
---

Read the active file and return a three-bullet summary.
```

Invoke: `/summarise`

---

### Method 2 – Parameterised Skill

```
.claude/skills/explain/SKILL.md
```

```markdown
---
description: Explain a concept clearly for a junior developer.
argument-hint: "[concept]"
arguments: concept
---

Explain "$concept" clearly for a junior developer with a short example.
```

Invoke: `/explain React hydration`

---

### Method 3 – Script-Backed Skill

```
.claude/skills/git-push/SKILL.md
```

```markdown
---
description: Stage, commit with a generated message, and push the current branch.
allowed-tools: Bash
---

Run `scripts/smart-commit.sh` to stage all changes, generate a commit message, commit, and push.
```

```bash
# scripts/smart-commit.sh
#!/bin/bash
git add -A
MSG=$(claude -p "Write a one-line commit message for: $(git diff --cached --stat)")
git commit -m "$MSG"
git push
```

---

### Method 4 – Multi-Step Workflow Skill

```
.claude/skills/ship-feature/SKILL.md
```

```markdown
---
description: Lint, build, write a PR description, and confirm before pushing.
allowed-tools: Bash
---

Follow these steps in order:
1. Run `npm run lint` and fix any errors.
2. Run `npm run build` and resolve failures.
3. Write a concise PR description for the changes on the current branch.
4. Ask the user to confirm, then push.
```

---

### Method 5 – Forked Subagent Skill

```
.claude/skills/review/SKILL.md
```

```markdown
---
description: Run a code review in an isolated agent that cannot modify files.
context: fork
agent: Explore
---

Review the changed files on the current branch. Report issues grouped by severity.
Do not edit any files.
```

`context: fork` runs the skill in a subagent with its own context, keeping the main session clean.

---

## Installing Skills via the Plugin Marketplace

Skills can be bundled inside **plugins**. Plugins are installed with the `/plugin` command.

### Browse and install interactively

```
/plugin
```

Opens a tabbed UI: **Discover · Installed · Marketplaces · Errors**. Select a plugin and choose scope (User / Project / Local).

### Install from command line

```
/plugin install <plugin-name>@<marketplace>
```

**Example — install the official GitHub plugin:**

```
/plugin install github@claude-plugins-official
```

### Manage marketplaces

```bash
/plugin marketplace list                          # list configured marketplaces
/plugin marketplace add anthropics/claude-code    # add the Anthropic demo marketplace
/plugin marketplace add owner/repo                # add any GitHub repo as a marketplace
/plugin marketplace update claude-plugins-official
/plugin marketplace remove claude-plugins-official
```

### Reload after installing

```
/reload-plugins
```

### Default marketplace

The official Anthropic marketplace (`claude-plugins-official`) is configured by default. Browse it at https://claude.com/plugins.
