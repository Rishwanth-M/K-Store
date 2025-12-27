import React from "react";

// ✅ import from homecomponents (NOT components)
import Hero from "../../homecomponents/Hero";
import Featured from "../../homecomponents/Featured";
import ShopByIcons from "../../homecomponents/ShopByIcons";
import MiniHelmetsSection from "../../homecomponents/MiniHelmetsSection";
import MarqueeGrid from "../../homecomponents/MarqueeGrid";
import MovementDataSection from "../../homecomponents/MovementDataSection";
import HomeCombo from "../../homecomponents/HomeCombo";


// optional / commented
// import ShopGiftsBySport from "../../homecomponents/ShopGiftsBySport";
// import ShopBySport from "../../homecomponents/ShopBySport";
// import ProjectsPinnedSection from "../../homecomponents/ProjectsPinnedSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <main>
        <Hero />
        <Featured />
        <MiniHelmetsSection />
        <HomeCombo />
        <MarqueeGrid />
        <ShopByIcons />
        <MovementDataSection />
      </main>
    </div>
  );
};
