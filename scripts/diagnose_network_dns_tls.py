import socket
import ssl
import urllib.request
import urllib.error
import subprocess
import json

domains = ['calcmypower.com', 'www.calcmypower.com']

print("=== 1. DNS RESOLUTION (SYSTEM RESOLVER) ===")
for d in domains:
    try:
        addr_info = socket.getaddrinfo(d, 443, proto=socket.IPPROTO_TCP)
        ips = sorted(list(set(info[4][0] for info in addr_info)))
        print(f"{d} -> {ips}")
    except Exception as e:
        print(f"{d} -> ERROR: {e}")

print("\n=== 2. NSLOOKUP / RESOLVER COMPARISON (Google 8.8.8.8 vs Cloudflare 1.1.1.1) ===")
resolvers = [("Google", "8.8.8.8"), ("Cloudflare", "1.1.1.1")]
for res_name, res_ip in resolvers:
    print(f"\n--- Resolver: {res_name} ({res_ip}) ---")
    for d in domains:
        for rtype in ["A", "AAAA", "CNAME"]:
            try:
                cmd = ["nslookup", f"-type={rtype}", d, res_ip]
                res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
                out_lines = [l.strip() for l in res.stdout.splitlines() if l.strip() and not l.startswith("Server:") and not l.startswith("Address:")]
                print(f"  {d} ({rtype}) via {res_name}: {' | '.join(out_lines[:4])}")
            except Exception as e:
                print(f"  {d} ({rtype}) via {res_name}: ERROR {e}")

print("\n=== 3. TLS CERTIFICATE & HANDSHAKE INSPECTION (STRICT VERIFICATION) ===")
for d in domains:
    print(f"\n--- Checking TLS for {d} ---")
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((d, 443), timeout=10) as sock:
            with ctx.wrap_socket(sock, server_hostname=d) as ssock:
                cert = ssock.getpeercert()
                print(f"  TLS Handshake: SUCCESS")
                print(f"  Cipher: {ssock.cipher()}")
                subject = dict(x[0] for x in cert.get('subject', []))
                print(f"  Subject: {subject}")
                sans = [x[1] for x in cert.get('subjectAltName', []) if x[0] == 'DNS']
                print(f"  SANs: {sans}")
                print(f"  Valid Until: {cert.get('notAfter')}")
                # Check if d is in sans or matches wildcard
                matched = False
                for san in sans:
                    if san == d:
                        matched = True
                    elif san.startswith("*.") and d.endswith(san[1:]):
                        matched = True
                print(f"  Hostname {d} matches certificate: {matched}")
    except Exception as e:
        print(f"  TLS ERROR for {d}: {e}")

print("\n=== 4. HTTP / HTTPS REDIRECT CHAIN INSPECTION ===")
test_urls = [
    "http://calcmypower.com/",
    "https://calcmypower.com/",
    "http://www.calcmypower.com/",
    "https://www.calcmypower.com/",
    "https://calcmypower.com/robots.txt",
    "https://calcmypower.com/sitemap.xml",
    "https://calcmypower.com/how-many-watts-can-a-15-amp-or-20-amp-circuit-handle"
]

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler)

for url in test_urls:
    print(f"\n--- Testing URL: {url} ---")
    current_url = url
    hop = 0
    max_hops = 6
    while hop < max_hops:
        hop += 1
        req = urllib.request.Request(
            current_url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
        )
        try:
            with opener.open(req, timeout=10) as resp:
                print(f"  [Hop {hop}] {current_url} -> HTTP {resp.status}")
                print(f"    Server: {resp.headers.get('Server')}")
                break
        except urllib.error.HTTPError as e:
            loc = e.headers.get("Location")
            print(f"  [Hop {hop}] {current_url} -> HTTP {e.code} (Redirect)")
            print(f"    Server: {e.headers.get('Server')}")
            print(f"    Location: {loc}")
            if e.code in [301, 302, 307, 308] and loc:
                # Resolve relative redirect if needed
                if loc.startswith("/"):
                    from urllib.parse import urljoin
                    current_url = urljoin(current_url, loc)
                else:
                    current_url = loc
            else:
                break
        except Exception as e:
            print(f"  [Hop {hop}] {current_url} -> ERROR: {e}")
            break
