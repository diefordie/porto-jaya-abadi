import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"d:\ordinary life's\JOKI TUGAS\WEB YOHAN"
html_path = os.path.join(workspace_dir, "langgan_jaya_abadi_website_9.html")

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace all base64 data with placeholder
clean = re.sub(r'data:image/(jpeg|png);base64,[^"\')\s]+', 'PLACEHOLDER_IMG', content)

# Write clean version
out_path = os.path.join(workspace_dir, "clean_structure.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(clean)

print(f"Wrote clean HTML ({len(clean)} bytes) to {out_path}")
