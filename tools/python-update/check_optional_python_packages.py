"""Check optional Python packages used during Codex helper workflows."""

from __future__ import annotations

import importlib.util
import sys


PACKAGES = {
    "yaml": "PyYAML; needed by skill-creator quick_validate.py",
    "fitz": "PyMuPDF; useful for richer PDF inspection",
    "pypdf": "pypdf; fallback PDF text/page inspection",
}


def main() -> int:
    print(f"Python: {sys.executable}")
    missing = []

    for module_name, note in PACKAGES.items():
        found = importlib.util.find_spec(module_name) is not None
        status = "OK" if found else "MISSING"
        print(f"{status:7} {module_name:8} {note}")
        if not found:
            missing.append(module_name)

    if missing:
        print("\nMissing optional modules:", ", ".join(missing))
        return 1

    print("\nAll optional modules are available.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
