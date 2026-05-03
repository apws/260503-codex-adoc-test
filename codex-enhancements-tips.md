# Codex Enhancements / Tips

This file collects local notes about Codex app workflow ideas, rough edges, and possible feedback items.

## UX feedback candidates

### [codex-ui][status-visibility][accessibility] Make active work state more visible

When Codex is thinking or working, the current UI state can be too subtle:

- The left sidebar may show a red activity marker.
- The central message such as "Working for ..." appears grey and is easy to miss.
- During longer tasks, it is not always obvious whether Codex is still active, stalled, waiting for permission, or finished.

Suggested improvements:

- Make the central "Working for ..." state visually stronger, possibly red/orange or otherwise high contrast.
- Add an animated indeterminate progress indicator while work is active.
- Show a small rolling activity list, for example:
  - reading files
  - running command
  - waiting for output
  - preparing response
- Distinguish clearly between:
  - actively working
  - waiting for user permission
  - waiting for a long-running command
  - completed

The progress indicator does not need an ETA or percentage. An indeterminate animated bar or rotating bullet list would already help users understand that the agent is alive and busy.

Possible product-team framing:

> Codex active-work status is sometimes too quiet, especially in fullscreen. Please make the central working indicator more visible and add an indeterminate progress/activity animation so users can tell whether Codex is still working or waiting.

