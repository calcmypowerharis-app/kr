/**
 * CalcMyPower — Amazon Associates Affiliate Configuration
 *
 * Complies with Rule 11 (Amazon Affiliate Rules):
 * - Central single source of truth for the Amazon Associates tracking ID.
 * - Supports environment variable override via NEXT_PUBLIC_AMAZON_AFFILIATE_TAG.
 * - Defaults to the approved Associates Store ID ('thedeskriser2-20').
 * - Generates clean, robust Amazon search URLs with rel="nofollow noopener noreferrer".
 */

export const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "thedeskriser2-20";

/**
 * Generates an Amazon keyword search URL tagged with the active Associate Store ID.
 *
 * @param query - The search keywords (e.g. 'digital clamp meter true rms')
 * @returns Fully qualified Amazon search URL
 */
export function getAmazonSearchUrl(query: string): string {
  const sanitized = query.trim().replace(/\s+/g, "+");
  return `https://www.amazon.com/s?k=${encodeURIComponent(sanitized).replace(/%2B/g, "+")}&tag=${AMAZON_ASSOCIATE_TAG}`;
}

/**
 * Standard rel attribute for Amazon affiliate links per FTC and search engine guidelines.
 */
export const AMAZON_LINK_REL = "nofollow noopener noreferrer";
