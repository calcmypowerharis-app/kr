import React from "react";

/**
 * Toggleable Google AdSense Component
 *
 * Pre-wired for future high-RPC monetization.
 * While ADSENSE_ENABLED is false, returns null to ensure zero empty containers
 * or layout shifts during Google AdSense site approval review.
 */
export const ADSENSE_ENABLED = false;

interface AdSlotProps {
  slot: "below-calculator" | "below-guide" | "sidebar";
  adClient?: string;
  adSlotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slot,
  adClient = "ca-pub-XXXXXXXXXXXXXXXX",
  adSlotId,
  className = "",
}) => {
  if (!ADSENSE_ENABLED) {
    return null;
  }

  // Pre-configured dimensions to eliminate Cumulative Layout Shift (CLS)
  const slotDimensions = {
    "below-calculator": "min-h-[250px] sm:min-h-[280px] max-w-[728px] mx-auto",
    "below-guide": "min-h-[250px] max-w-[728px] mx-auto",
    sidebar: "min-h-[600px] w-full max-w-[300px] mx-auto",
  }[slot];

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 flex flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-50 border border-slate-200/60 p-2 text-center text-xs text-slate-400 ${slotDimensions} ${className}`}
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlotId || "1234567890"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};
