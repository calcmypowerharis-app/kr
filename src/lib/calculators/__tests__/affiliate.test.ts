import { describe, it, expect } from "vitest";
import {
  AMAZON_ASSOCIATE_TAG,
  getAmazonSearchUrl,
  AMAZON_LINK_REL,
} from "@/config/affiliate";

describe("Amazon Associates Affiliate Configuration", () => {
  it("defaults to the approved associate tag 'thedeskriser2-20'", () => {
    expect(AMAZON_ASSOCIATE_TAG).toBe("thedeskriser2-20");
  });

  it("builds compliant Amazon search URLs with active tag", () => {
    const url = getAmazonSearchUrl("digital clamp meter auto ranging");
    expect(url).toContain("https://www.amazon.com/s?k=digital+clamp+meter+auto+ranging");
    expect(url).toContain(`tag=${AMAZON_ASSOCIATE_TAG}`);
  });

  it("handles leading and trailing whitespace cleanly", () => {
    const url = getAmazonSearchUrl("  kill a watt meter   ");
    expect(url).toBe(`https://www.amazon.com/s?k=kill+a+watt+meter&tag=${AMAZON_ASSOCIATE_TAG}`);
  });

  it("encodes special characters safely in search queries", () => {
    const url = getAmazonSearchUrl("3-phase power & energy meter 120/240V");
    expect(url).toContain("tag=thedeskriser2-20");
    expect(url.startsWith("https://www.amazon.com/s?k=")).toBe(true);
  });

  it("enforces safe rel attribute with nofollow, noopener, and noreferrer", () => {
    expect(AMAZON_LINK_REL).toContain("nofollow");
    expect(AMAZON_LINK_REL).toContain("noopener");
    expect(AMAZON_LINK_REL).toContain("noreferrer");
  });
});
