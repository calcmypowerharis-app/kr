import urllib.request
import time
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

URLS = [
    "https://calcmypower.com/how-to-calculate-electricity-bill",
    "https://calcmypower.com/how-to-calculate-watts-for-a-generator",
    "https://calcmypower.com/how-to-size-a-solar-charge-controller",
    "https://calcmypower.com/continuous-power-generators",
]

def check_live():
    print("Checking live production HTML responses on calcmypower.com...")
    all_clean = True
    for url in URLS:
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (CalcMyPower-Live-Verification)"}
            )
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                status = resp.status
                html = resp.read().decode("utf-8")
                
                # Check for items-start on outer grid
                has_items_start = 'lg:grid-cols-12 gap-8 lg:gap-12 items-start' in html or 'lg:grid-cols-12 items-start' in html
                print(f"[{status}] {url}")
                if has_items_start:
                    print("  -> PENDING DEPLOYMENT (still has items-start)")
                    all_clean = False
                else:
                    print("  -> VERIFIED LIVE (items-start is REMOVED!)")
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            all_clean = False
    return all_clean

if __name__ == "__main__":
    check_live()
