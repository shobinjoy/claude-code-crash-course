# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository holds a project-level MCP (Model Context Protocol) server configuration for Claude Code. The `.mcp.json` file registers MCP servers that become available to Claude Code when working in this directory.

## MCP Configuration

The [.mcp.json](.mcp.json) file configures the following MCP server:

- **context7** — HTTP-based documentation server at `https://mcp.context7.com/mcp`. Use it to fetch up-to-date library/framework docs via `mcp__context7__resolve-library-id` and `mcp__context7__query-docs`.

To add more MCP servers, extend `.mcp.json` under the `mcpServers` key using either `"type": "http"` (remote) or `"type": "stdio"` (local process) entries.

## Standing Instructions

- **LangGraph**: Always look up current documentation via Context7 (`mcp__context7__resolve-library-id` then `mcp__context7__query-docs`) before answering any LangGraph question.