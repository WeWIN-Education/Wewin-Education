from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
output = root.parent / 'wewin-luyen-thi-demo.zip'
files = [root / name for name in ['index.html', 'styles.css', 'app.mjs', 'exam.mjs', 'exams.mjs', '.htaccess', 'README.md', 'IMAGE_ASSETS.md']]
files.append(root / 'tools' / 'test-scoring.mjs')
files.append(root / 'tools' / 'test-ten-tests.mjs')
files += [p for p in (root / 'assets').rglob('*') if p.is_file() and not p.name.startswith(('page-', 'inspection-', 'mascots.'))]
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file, file.relative_to(root).as_posix())
print(f'Packaged {len(files)} files. Archive size: {output.stat().st_size / 1024 / 1024:.1f} MB')
