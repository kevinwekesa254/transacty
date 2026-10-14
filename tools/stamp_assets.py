# Adds/refreshes a ?v= version on every local CSS/JS/logo link so browsers fetch the new files after a change.
# Run after editing: python3 tools/stamp_assets.py
import os, re, time, glob
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
v = time.strftime('%Y%m%d%H%M')
pat = re.compile(r'((?:href|src)="(?:css|js|assets)/[^"?]+\.(?:css|js|png|svg|webp))(?:\?v=\d+)?"')
files = glob.glob(os.path.join(ROOT, '*.html')) + [os.path.join(ROOT, 'tools', 'build_legal.py')]
files += [os.path.join(ROOT, 'js', n) for n in ('main.js', 'demo-form.js')]
for f in files:
    s = open(f).read(); s2 = pat.sub(r'\1?v=' + v + '"', s)
    if s2 != s: open(f, 'w').write(s2)
print('stamped', v)
