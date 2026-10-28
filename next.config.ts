import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.calcmypower.com",
          },
        ],
        destination: "https://calcmypower.com/:path*",
        statusCode: 301,
      },
      {
        source: "/how-to-calculate-electricity-usage",
        destination: "/electricity-use-calculator",
        statusCode: 301,
      },
      {
        source: "/how-to-calculate-electricity-bill",
        destination: "/electricity-cost-calculator",
        statusCode: 301,
      },
      {
        source: "/how-to-calculate-watts-for-a-generator",
        destination: "/generator-size-calculator",
        statusCode: 301,
      },
      {
        source: "/generator-wattage-chart",
        destination: "/generator-size-calculator",
        statusCode: 301,
      },
      {
        source: "/generator-amperage-chart-calculator",
        destination: "/generator-size-calculator",
        statusCode: 301,
      },
      {
        source: "/how-much-gas-does-a-generator-use",
        destination: "/generator-fuel-consumption-calculator",
        statusCode: 301,
      },
      {
        source: "/how-to-size-a-solar-charge-controller",
        destination: "/solar-charge-controller-calculator",
        statusCode: 301,
      },
      {
        source: "/how-many-solar-panels-do-i-need",
        destination: "/solar-system-size-calculator",
        statusCode: 301,
      },
      {
        source: "/how-to-calculate-amp-hours-of-a-battery-bank",
        destination: "/battery-capacity-calculator",
        statusCode: 301,
      },
      {
        source: "/continuous-power-generators",
        destination: "/what-size-generator-do-i-need-for-my-house",
        statusCode: 301,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        statusCode: 301,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
