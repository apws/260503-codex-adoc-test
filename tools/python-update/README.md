# Optional Python Runtime Updates

This folder documents optional Python packages that were useful during the Codex learning session.

The repo itself does **not** require these packages to render AsciiDoc. `deno task render` uses Deno, Asciidoctor.js, and installed Chrome / Edge for PDF export.

## What Was Missing

- `yaml` / `PyYAML`
  - Needed by Codex's `skill-creator/scripts/quick_validate.py`.
  - Without it, validating a local skill failed with `ModuleNotFoundError: No module named 'yaml'`.

- `fitz` / `PyMuPDF`
  - Useful for richer PDF inspection.
  - A lighter fallback, `pypdf`, was already available in the bundled Python runtime and worked for page text/page count checks.

## Check Only

```powershell
python .\tools\python-update\check_optional_python_packages.py
```

Or with the Codex bundled Python:

```powershell
C:\Users\petra\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe .\tools\python-update\check_optional_python_packages.py
```

## Install Into The Current Python Environment

Run this only for the Python environment you intentionally want to modify:

```powershell
python .\tools\python-update\install_optional_python_packages.py
```

For the Codex bundled Python:

```powershell
C:\Users\petra\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe .\tools\python-update\install_optional_python_packages.py
```

The installer uses:

```text
python -m pip install PyYAML PyMuPDF
```

Do not run it unless you are comfortable modifying that Python environment.
