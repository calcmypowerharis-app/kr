import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for CalcMyPower.
 * Note: Under RFC 9309, robots.txt directives provide advisory guidance requesting
 * that compliant crawlers not fetch matching paths. It is not an authentication,
 * authorization, or security access-control mechanism.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://calcmypower.com/sitemap.xml",
  };
}
