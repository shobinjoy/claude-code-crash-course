# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository is a collection of Claude Code custom slash commands. Each command is a Markdown file under `.claude/commands/` that defines a reusable prompt invocable as `/command-name` within Claude Code sessions.

## Custom Commands

Commands live in `.claude/commands/*.md`. The filename (without `.md`) becomes the slash command name. Commands can reference `$ARGUMENTS` (or `$arguments`) to receive inline user input.

| Command | File | Description |
|---|---|---|
| `/commit-code` | `commit-code.md` | Reviews changed files and creates a git commit with a concise, business-logic-focused message. Accepts optional hint via `$ARGUMENTS`. |
| `/dad-joke` | `dad-joke.md` | Generates a dad joke on the topic passed via `$ARGUMENTS`. |
| `/weather` | `weather.md` | Fetches **live** current weather for a city using `WebSearch`. Returns temperature (°C/°F), condition, humidity, wind, and advisories with source/timestamp. Never falls back to historical data. |

## Permissions

`.claude/settings.local.json` grants the `WebSearch` tool and restricts `WebFetch` to specific weather domains (`accuweather.com`, `forecast.weather.gov`). When adding commands that require new tool access, update this file.

## Adding a New Command

1. Create `.claude/commands/<name>.md` with a prompt. Use `$ARGUMENTS` where user input should be substituted.
2. If the command needs tools not currently allowed, add entries to `.claude/settings.local.json` under `permissions.allow`.
