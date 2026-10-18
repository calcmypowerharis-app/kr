import subprocess

queries = [
    ("NS for calcmypower.com", ["nslookup", "-type=NS", "calcmypower.com", "8.8.8.8"]),
    ("A for calcmypower.com", ["nslookup", "-type=A", "calcmypower.com", "8.8.8.8"]),
    ("AAAA for calcmypower.com", ["nslookup", "-type=AAAA", "calcmypower.com", "8.8.8.8"]),
    ("A for www.calcmypower.com", ["nslookup", "-type=A", "www.calcmypower.com", "8.8.8.8"]),
    ("CNAME for www.calcmypower.com", ["nslookup", "-type=CNAME", "www.calcmypower.com", "8.8.8.8"]),
    ("AAAA for www.calcmypower.com", ["nslookup", "-type=AAAA", "www.calcmypower.com", "8.8.8.8"]),
]

for label, cmd in queries:
    print(f"\n--- {label} ---")
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        lines = [l.strip() for l in res.stdout.splitlines() if l.strip() and not l.startswith("Server:") and not l.startswith("Address:")]
        for l in lines:
            print(" ", l)
    except Exception as e:
        print("  Error:", e)
