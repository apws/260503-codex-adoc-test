"""Install optional Python packages used by Codex helper workflows.

Run this with the exact Python interpreter you intend to modify.
"""

from __future__ import annotations

import subprocess
import sys


PACKAGES = ["PyYAML", "PyMuPDF"]


def main() -> int:
    print(f"Python: {sys.executable}")
    print("Installing optional packages:", ", ".join(PACKAGES))

    return subprocess.call([
        sys.executable,
        "-m",
        "pip",
        "install",
        *PACKAGES,
    ])


if __name__ == "__main__":
    raise SystemExit(main())
