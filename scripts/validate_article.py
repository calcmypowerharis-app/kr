import re
import sys

def validate_article(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    errors = []

    # 1. Em-dash check
    if "\u2014" in content:
        count = content.count("\u2014")
        errors.append(f"Contains {count} em-dash (\\u2014) character(s).")

    # 2. Extract <p> tags and check word count
    p_tags = re.findall(r"<p\b[^>]*>(.*?)</p>", content, re.DOTALL)
    dense_paragraphs = []
    total_words = 0

    for i, p in enumerate(p_tags):
        # strip inner tags
        clean_p = re.sub(r"<[^>]+>", " ", p)
        # clean JSX curly expressions like {" "}
        clean_p = re.sub(r"\{[^}]*\}", " ", clean_p)
        clean_p = re.sub(r"&[a-z0-9#]+;", " ", clean_p)
        words = clean_p.strip().split()
        word_count = len(words)
        total_words += word_count

        if word_count > 55:
            dense_paragraphs.append((i + 1, word_count, " ".join(words[:10]) + "..."))

    if dense_paragraphs:
        for idx, count, snippet in dense_paragraphs:
            errors.append(f"Paragraph #{idx} has {count} words (> 55 words): '{snippet}'")

    # 3. Check FAQ parity
    faq_data_match = re.search(r"const FAQ_DATA\s*=\s*\[(.*?)\];", content, re.DOTALL)
    if faq_data_match:
        faq_questions = re.findall(r'question:\s*["\']([^"\']+)["\']', faq_data_match.group(1))
        # Find summary texts
        summary_tags = re.findall(r"<summary\b[^>]*>(.*?)</summary>", content, re.DOTALL)
        summary_texts = []
        for s in summary_tags:
            # find inner span or text
            span_match = re.search(r"<span>(.*?)</span>", s)
            text = span_match.group(1) if span_match else re.sub(r"<[^>]+>", "", s)
            summary_texts.append(text.strip())

        if len(faq_questions) != len(summary_texts):
            errors.append(f"FAQ count mismatch: {len(faq_questions)} in FAQ_DATA vs {len(summary_texts)} in <summary>")
        else:
            for q, s in zip(faq_questions, summary_texts):
                if q != s:
                    errors.append(f"FAQ question mismatch:\n  FAQ_DATA: '{q}'\n  <summary>: '{s}'")
    else:
        errors.append("Could not find FAQ_DATA definition.")

    # 4. Check canonical shell requirements
    required_strings = [
        'max-w-[1320px]',
        'lg:grid-cols-12',
        'id="article-content"',
        '<aside className="hidden lg:block lg:col-span-4">',
        '<TableOfContents items={TOC_ITEMS} cluster="electricity" />',
        '<MobileArticleNavigator items={TOC_ITEMS} />',
        '<ReadingProgressBar />',
        'ArticleDateByline',
        'ZoomableArticleImage',
        'id="faq"',
    ]
    for req in required_strings:
        if req not in content:
            errors.append(f"Missing required canonical string: {req}")

    if 'items-start' in content:
        # Check if items-start is on lg:grid-cols-12
        for m in re.finditer(r'className=["\'][^"\']*lg:grid-cols-12[^"\']*["\']', content):
            if 'items-start' in m.group(0):
                errors.append("Outer lg:grid-cols-12 container must NOT have items-start.")

    print(f"Validation summary for {file_path}:")
    print(f"  Total <p> tags: {len(p_tags)}")
    print(f"  Total prose words in <p>: {total_words}")
    if errors:
        print(f"  ERRORS FOUND ({len(errors)}):")
        for err in errors:
            print(f"    - {err}")
        return False
    else:
        print("  ALL QUALITY CHECKS PASSED!")
        return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate_article.py <path_to_page.tsx>")
        sys.exit(1)
    success = validate_article(sys.argv[1])
    sys.exit(0 if success else 1)
