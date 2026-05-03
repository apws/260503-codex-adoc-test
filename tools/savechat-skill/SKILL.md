---
name: savechat
description: Create or update a durable project-local session log when the user asks to save chat context, preserve a Codex session, create a collapsible HTML/Markdown learning reference, or uses commands like "savechat YYMMDDx topic". Use for summarizing the current conversation into a repo file with timeline, decisions, commands, files, commits, gotchas, and follow-up notes.
---

# Savechat

## Workflow

When triggered, create or update a curated session artifact in the current project. Prefer user-facing workspace paths, such as `V:\...`, when the user has specified a path convention.

1. Parse the requested id/topic.
   - Pattern: `savechat YYMMDDx topic`
   - Output filename: `YYMMDDx topic.html`
   - If the user says only `savechat`, find the most recently modified project-root HTML file matching `^\d{6}[a-z] .+\.html$` and update that file.
   - If multiple matching root files exist, choose the newest by modification time and mention the chosen file.
   - If no id/topic is provided, infer a concise topic and ask only if the filename would be risky or unclear.

2. Inspect available evidence before writing.
   - Use `git log --format="%h%x09%cI%x09%s"` for commit timestamps.
   - Use file timestamps for generated/session artifacts when useful.
   - Use `git status --short` to report untracked or modified reference files.
   - Do not claim exact per-message timestamps unless the app exposes them. Label reconstructed times as approximate.

3. Write a curated artifact, not a verbatim transcript.
   - Preserve important context, decisions, commands, files touched, commits, verification results, gotchas, and open questions.
   - Use collapsible `<details>` sections for HTML output.
   - Add a top timeline section with exact commit/file evidence and approximate inferred chat steps.
   - Include reusable prompts or patterns discovered during the session.

4. Choose output location.
   - Default: project root, so the artifact can be committed if the user wants.
   - For bare `savechat`, prefer the latest existing project-root `YYMMDDx *.html` log over creating a new file.
   - Optional scratch copy: `.codex/session-reference-YYYY-MM-DD.html` if helpful.
   - Do not write to `dist/` unless explicitly requested; `dist/` is generated output in many repos.

5. Preserve and update.
   - If the root session file exists, update it in place and preserve useful existing sections.
   - Add new sections for later events instead of rewriting the whole artifact unnecessarily.
   - Keep formatting readable in a browser without external dependencies.

## HTML Shape

Use the bundled `assets/session-template.html` as a starting point when creating a new HTML log. Replace placeholders such as `{{TITLE}}`, `{{SUBTITLE}}`, and `{{SECTIONS}}`.

Recommended sections:

- Approximate Session Timeline
- Repo Context And Ground Rules
- Major Work Blocks
- Rendering / Verification
- Git / Commit / Push Notes
- UX Feedback Or Product Notes
- Reusable Commands
- Current Mental Model

## Safety And Accuracy

- Mark inferred times with `~`.
- Distinguish evidence from inference.
- Do not expose credentials, tokens, private keys, or sensitive command output.
- Do not commit the artifact unless the user explicitly asks.
- If the user asks for a literal export of the app transcript, explain that the agent can only create a curated local reference unless a native export is available.
