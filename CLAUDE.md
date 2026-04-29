# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is an educational project demonstrating **Claude Code Hooks** — scripts that run automatically at specific points in the Claude Code workflow (e.g., when Claude finishes responding). The current implementation plays a WAV sound notification.

## Commands

**Install dependencies:**
```bash
uv sync
```

**Run the sound script manually:**
```bash
uv run play_sound.py
```

No test, lint, or build pipeline is configured.

## Architecture

The project has two runtime components:

- [play_sound.py](play_sound.py) — Entry point called by Claude Code hooks. Uses the Windows `winsound` module to play `ulala.wav` from the same directory. This is Windows-only; a cross-platform version would use `pygame.mixer`.
- `ulala.wav` — The notification sound file.

Hook configuration lives in `.claude/settings.json` (project-level) and maps lifecycle events to shell commands. Example — triggering `play_sound.py` when Claude stops:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "uv run play_sound.py"
          }
        ]
      }
    ]
  }
}
```

### Available hook events
| Event | Fires when... |
|---|---|
| `PreToolUse` | Before Claude invokes any tool |
| `PostToolUse` | After a tool call completes |
| `UserPromptSubmit` | When the user submits a prompt |
| `Stop` / `SubagentStop` | When Claude finishes its response |
| `Notification` | On system notifications |
| `PreCompact` | Before context compaction |

## Key Dependency

- **pygame >= 2.6.1** — listed in [pyproject.toml](pyproject.toml) for cross-platform audio; current script uses `winsound` instead (Windows built-in, no install needed).
- **uv** — package manager; use `uv run` rather than `python` directly.
- Python >= 3.14 required.
