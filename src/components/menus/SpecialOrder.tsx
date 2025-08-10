import React from "react";

const SpecialOrder = () => {
  return (
    <section className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-10 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 items-start">
        {/* Left Label */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-[#5b4636] uppercase tracking-wider">Special Order</h2>
          <p className="text-[#A0522D] italic font-medium mt-1">Before 1 day</p>
          <div className="mt-4 text-sm text-[#5b4636]">☘ Vegetarian</div>
        </div>

        {/* Middle Two Columns */}
        <div className="md:col-span-2 space-y-6 text-sm">
          <div>
            <div className="font-semibold text-[#5b4636]">
              <span>Seafood Hotpot</span>
            </div>
            <p className="italic text-[#8B4513]">Lẩu hải sản</p>
            <p className="text-gray-700">
              Mixed seafood (shrimp, squid, clams, fish), mushrooms, tofu, vegetables, hotpot broth, vermicelli or noodles
            </p>
          </div>

          <div>
            <div className="font-semibold text-[#5b4636]">
              <span>Fermented Fish Hotpot</span>
            </div>
            <p className="italic text-[#8B4513]">Lẩu mắm</p>
            <p className="text-gray-700">
              Fermented fish broth (with linh or sặc fish), shrimp, squid, pork belly, vegetable, banana blossom, vermicelli or noodles
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 space-y-6 text-sm">
          <div>
            <div className="font-semibold text-[#5b4636]">
              <span>Mixed Hotpot</span>
            </div>
            <p className="italic text-[#8B4513]">Lẩu Tả Pín Lù</p>
            <p className="text-gray-700">
              Beef, pork, shrimp, squid, fish balls, tofu, mushrooms, vegetables, hotpot broth, vermicelli or noodles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOrder;
