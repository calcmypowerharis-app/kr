import socket
import ssl
import time
import urllib.request
import urllib.error
import json

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

results = []

for url in test_urls:
    print(f"\n==================================================")
    print(f"TESTING URL: {url}")
    print(f"==================================================")
    
    current_url = url
    hop = 0
    max_hops = 5
    chain = []
    
    while hop < max_hops:
        hop += 1
        parsed = urllib.parse.urlparse(current_url)
        host = parsed.hostname
        port = parsed.port or (443 if parsed.scheme == "https" else 80)
        
        # 1. DNS Resolution
        t0_dns = time.perf_counter()
        try:
            addr_info = socket.getaddrinfo(host, port, proto=socket.IPPROTO_TCP)
            resolved_ips = sorted(list(set(info[4][0] for info in addr_info)))
            dns_time_ms = (time.perf_counter() - t0_dns) * 1000
        except Exception as e:
            resolved_ips = [f"DNS_ERROR: {e}"]
            dns_time_ms = (time.perf_counter() - t0_dns) * 1000

        # 2. TCP / TLS Connection
        t0_conn = time.perf_counter()
        tls_valid = None
        tls_error = None
        cert_san = []
        cert_cn = None
        
        try:
            if parsed.scheme == "https":
                ctx = ssl.create_default_context()
                with socket.create_connection((host, port), timeout=8) as raw_sock:
                    conn_time_ms = (time.perf_counter() - t0_conn) * 1000
                    with ctx.wrap_socket(raw_sock, server_hostname=host) as ssock:
                        cert = ssock.getpeercert()
                        cert_cn = dict(x[0] for x in cert.get('subject', [])).get('commonName')
                        cert_san = [x[1] for x in cert.get('subjectAltName', []) if x[0] == 'DNS']
                        tls_valid = True
            else:
                with socket.create_connection((host, port), timeout=8) as raw_sock:
                    conn_time_ms = (time.perf_counter() - t0_conn) * 1000
                    tls_valid = "N/A (HTTP)"
        except Exception as e:
            conn_time_ms = (time.perf_counter() - t0_conn) * 1000
            tls_valid = False
            tls_error = str(e)
            
        # 3. HTTP Request
        t0_http = time.perf_counter()
        status_code = None
        server_header = None
        loc_header = None
        body_len = 0
        http_error = None
        
        req = urllib.request.Request(
            current_url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
        )
        try:
            with opener.open(req, timeout=10) as resp:
                total_time_ms = (time.perf_counter() - t0_http) * 1000
                status_code = resp.status
                server_header = resp.headers.get("Server")
                body = resp.read()
                body_len = len(body)
                chain.append({
                    "hop": hop,
                    "url": current_url,
                    "status": status_code,
                    "server": server_header,
                    "dns_ips": resolved_ips,
                    "dns_time_ms": round(dns_time_ms, 2),
                    "conn_time_ms": round(conn_time_ms, 2),
                    "total_time_ms": round(total_time_ms, 2),
                    "tls_valid": tls_valid,
                    "tls_error": tls_error,
                    "cert_cn": cert_cn,
                    "cert_san": cert_san,
                    "body_len": body_len
                })
                break
        except urllib.error.HTTPError as e:
            total_time_ms = (time.perf_counter() - t0_http) * 1000
            status_code = e.code
            server_header = e.headers.get("Server")
            loc_header = e.headers.get("Location")
            chain.append({
                "hop": hop,
                "url": current_url,
                "status": status_code,
                "server": server_header,
                "location": loc_header,
                "dns_ips": resolved_ips,
                "dns_time_ms": round(dns_time_ms, 2),
                "conn_time_ms": round(conn_time_ms, 2),
                "total_time_ms": round(total_time_ms, 2),
                "tls_valid": tls_valid,
                "tls_error": tls_error,
                "cert_cn": cert_cn,
                "cert_san": cert_san,
                "body_len": 0
            })
            if status_code in [301, 302, 307, 308] and loc_header:
                current_url = urllib.parse.urljoin(current_url, loc_header)
            else:
                break
        except Exception as e:
            total_time_ms = (time.perf_counter() - t0_http) * 1000
            http_error = str(e)
            chain.append({
                "hop": hop,
                "url": current_url,
                "status": "CONNECTION_ERROR",
                "error": http_error,
                "dns_ips": resolved_ips,
                "dns_time_ms": round(dns_time_ms, 2),
                "conn_time_ms": round(conn_time_ms, 2),
                "total_time_ms": round(total_time_ms, 2),
                "tls_valid": tls_valid,
                "tls_error": tls_error
            })
            break

    results.append({"initial_url": url, "chain": chain})

with open("scripts/audit_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\n\n" + "=" * 80)
print("AUDIT RESULTS SUMMARY")
print("=" * 80)
for item in results:
    u = item["initial_url"]
    c = item["chain"]
    hops_str = " -> ".join([f"HTTP {h.get('status')} ({h.get('url')})" for h in c])
    last = c[-1]
    print(f"\nTarget: {u}")
    print(f"  Total Hops: {len(c)}")
    print(f"  Chain: {hops_str}")
    print(f"  Final Status: {last.get('status')}")
    print(f"  TLS Valid: {last.get('tls_valid')}")
    if last.get("tls_error"):
        print(f"  TLS Error: {last.get('tls_error')}")
    if last.get("error"):
        print(f"  HTTP Connection Error: {last.get('error')}")
    print(f"  Payload Size: {last.get('body_len', 0)} bytes")
