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
        permanent: true,
      },
      {
        source: "/how-to-calculate-electricity-usage",
        destination: "/electricity-use-calculator",
        permanent: true,
      },
      {
        source: "/how-to-calculate-electricity-bill",
        destination: "/electricity-cost-calculator",
        permanent: true,
      },
      {
        source: "/how-to-calculate-watts-for-a-generator",
        destination: "/generator-size-calculator",
        permanent: true,
      },
      {
        source: "/generator-wattage-chart",
        destination: "/generator-size-calculator",
        permanent: true,
      },
      {
        source: "/generator-amperage-chart-calculator",
        destination: "/generator-size-calculator",
        permanent: true,
      },
      {
        source: "/how-much-gas-does-a-generator-use",
        destination: "/generator-fuel-consumption-calculator",
        permanent: true,
      },
      {
        source: "/how-to-size-a-solar-charge-controller",
        destination: "/solar-charge-controller-calculator",
        permanent: true,
      },
      {
        source: "/how-many-solar-panels-do-i-need",
        destination: "/solar-system-size-calculator",
        permanent: true,
      },
      {
        source: "/how-to-calculate-amp-hours-of-a-battery-bank",
        destination: "/battery-capacity-calculator",
        permanent: true,
      },
      {
        source: "/continuous-power-generators",
        destination: "/what-size-generator-do-i-need-for-my-house",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
