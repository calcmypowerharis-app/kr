import os
import re
import json

APP_DIR = r"d:\Solar Power Project\src\app"

def audit_articles():
    article_routes = []
    for entry in sorted(os.listdir(APP_DIR)):
        page_path = os.path.join(APP_DIR, entry, "page.tsx")
        if os.path.isfile(page_path):
            with open(page_path, "r", encoding="utf-8") as f:
                content = f.read()
            if "generateArticleSchema" in content:
                article_routes.append((entry, page_path, content))

    results = []
    for slug, path, content in article_routes:
        route = f"/{slug}"
        # Canonical
        can_match = re.search(r'canonical:\s*"(https://calcmypower\.com[^"]*)"', content)
        canonical = can_match.group(1) if can_match else "MISSING"

        # H1
        h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        h1_clean = [re.sub(r'<[^>]+>', '', h).strip() for h in h1_matches]
        h1_text = h1_clean[0] if h1_clean else "MISSING"
        h1_count = len(h1_matches)

        # Article Schema
        has_article_schema = "generateArticleSchema" in content

        # FAQ Schema
        has_faq_schema = "generateFaqSchema" in content

        # Images
        img_matches = re.findall(r'/images/articles/[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|svg)', content)
        unique_images = sorted(list(set(img_matches)))

        # Internal links
        internal_links = re.findall(r'href="(/[a-zA-Z0-9_#?-]+)"', content)
        internal_link_count = len(internal_links)

        # Extract <p> tags
        p_tags = re.findall(r'<p(?:\s+[^>]*)?>(.*?)</p>', content, re.DOTALL)
        article_p = []
        for p in p_tags:
            clean_p = re.sub(r'<[^>]+>', '', p).strip()
            clean_p = clean_p.replace('&amp;', '&').replace('&nbsp;', ' ').replace('&quot;', '"').replace('&#39;', "'")
            clean_p = re.sub(r'\s+', ' ', clean_p)
            if len(clean_p) > 0:
                article_p.append(clean_p)

        # Word count in JSX body
        parts = content.split("export default")
        body_text = parts[1] if len(parts) > 1 else content
        body_text = re.sub(r'<[^>]+>', ' ', body_text)
        body_text = re.sub(r'\s+', ' ', body_text).strip()
        words = [w for w in body_text.split() if re.search(r'[a-zA-Z0-9]', w)]
        total_words = len(words)

        dense_p = []
        for idx, p in enumerate(article_p):
            p_words = p.split()
            sentences = [s.strip() for s in re.split(r'[.!?]+(?:\s+|$)', p) if len(s.strip()) > 3]
            # Paragraphs exceeding target: > 55 words OR >= 3 sentences
            if len(p_words) > 55 or len(sentences) >= 3:
                dense_p.append({
                    "idx": idx,
                    "words": len(p_words),
                    "sentences": len(sentences),
                    "preview": p[:120] + "..." if len(p) > 120 else p
                })

        results.append({
            "route": route,
            "filePath": path,
            "canonical": canonical,
            "h1": h1_text,
            "h1Count": h1_count,
            "hasArticleSchema": has_article_schema,
            "hasFaqSchema": has_faq_schema,
            "uniqueImages": unique_images,
            "internalLinks": internal_link_count,
            "totalWords": total_words,
            "totalParagraphs": len(article_p),
            "denseParagraphsCount": len(dense_p),
            "denseParagraphs": dense_p
        })

    return results

if __name__ == "__main__":
    results = audit_articles()
    summary = []
    total_dense = 0
    total_paras = 0
    for r in results:
        total_dense += r["denseParagraphsCount"]
        total_paras += r["totalParagraphs"]
        summary.append({
            "route": r["route"],
            "words": r["totalWords"],
            "paras": r["totalParagraphs"],
            "dense": r["denseParagraphsCount"],
            "canonical": r["canonical"],
            "h1": r["h1"][:40],
            "h1Count": r["h1Count"],
            "articleSchema": r["hasArticleSchema"],
            "faqSchema": r["hasFaqSchema"],
            "images": len(r["uniqueImages"]),
            "links": r["internalLinks"]
        })
    print(json.dumps(summary, indent=2))
    print(f"\nTOTAL ARTICLES: {len(results)}")
    print(f"TOTAL PARAGRAPHS: {total_paras}")
    print(f"TOTAL DENSE PARAGRAPHS: {total_dense}")
