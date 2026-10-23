"""Package the allowlisted public build, never source answers or secrets."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import subprocess

root = Path(__file__).resolve().parents[1]
subprocess.run(['node', str(root / 'tools/build.mjs')], cwd=root, check=True)
public = root / 'dist'
output = root.parent / 'wewin-luyen-thi-demo.zip'
files = sorted(p for p in public.rglob('*') if p.is_file())
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file, file.relative_to(public).as_posix())
    archive.writestr('BACKEND-REQUIRED.txt', 'WeWIN public assets only. Accounts, grading, AI and lead verification require the matching Vercel Node API and private Neon configuration. Do not upload source answer modules or secrets into a public web directory. Production: https://wewin-luyen-thi.vercel.app/\n')
print(f'Packaged {len(files)} public files. Archive size: {output.stat().st_size / 1024 / 1024:.1f} MB')
