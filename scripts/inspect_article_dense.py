import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

if len(sys.argv) < 2:
    print("Usage: python inspect_article_dense.py <slug>")
    sys.exit(1)

slug = sys.argv[1]
file_path = f"d:/Solar Power Project/src/app/{slug}/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

content = "".join(lines)

# Find <p ...>...</p> tags with line numbers
p_matches = re.finditer(r'<p(?:\s+[^>]*)?>(.*?)</p>', content, re.DOTALL)

print(f"=== INSPECTION: {slug} ===")
dense_count = 0
total_p = 0

for m in p_matches:
    start_pos = m.start()
    line_no = content[:start_pos].count('\n') + 1
    raw_p = m.group(0)
    p_body = m.group(1)
    clean_p = re.sub(r'<[^>]+>', '', p_body).strip()
    clean_p = clean_p.replace('&amp;', '&').replace('&nbsp;', ' ').replace('&quot;', '"').replace('&#39;', "'")
    clean_p = re.sub(r'\s+', ' ', clean_p)
    words = clean_p.split()
    sentences = [s.strip() for s in re.split(r'[.!?]+(?:\s+|$)', clean_p) if len(s.strip()) > 3]

    total_p += 1
    is_dense = len(words) > 50 or len(sentences) >= 3

    if is_dense:
        dense_count += 1
        print(f"\nLine {line_no} [{len(words)}w, {len(sentences)}s]:")
        print(f"  {clean_p}")

print(f"\nSummary for {slug}: Total <p>: {total_p}, Dense: {dense_count}")
