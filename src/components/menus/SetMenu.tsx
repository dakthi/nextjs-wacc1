import React from "react";

const SetMenu = () => {
  return (
    <section className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-12 max-w-4xl mx-auto space-y-12">

      {/* Set Menu */}
      <div className="border border-[#5b4636] p-6 shadow-md">
        <h2 className="text-3xl font-bold text-center text-[#5b4636] mb-6 uppercase tracking-wide">Set Menu</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Ideal for groups (minimum 2 people)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-[#8B4513] mb-2 uppercase">Sharing Platter</h3>
            <ul className="space-y-1 text-gray-800">
              <li>Summer Rolls with Prawn</li>
              <li>Pork Spring Rolls</li>
              <li>Salt ‘n’ Pepper Squid</li>
              <li>Papaya Salad with Prawns</li>
            </ul>
            <p className="text-gray-500 mt-2">Vegetarian options available</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#8B4513] mb-2 uppercase">Main</h3>
            <p className="mb-1 text-gray-800">Choose 1 dish per person</p>
            <ul className="space-y-1 text-gray-800">
              <li>Lemongrass Chili Chicken</li>
              <li>Pork Belly Stew</li>
              <li>Salmon Claypot</li>
              <li>Coconut Chicken Curry</li>
            </ul>
            <p className="mt-2 text-gray-600">+ Sides: Seasonal Asian greens and jasmine rice</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h4 className="font-semibold text-[#8B4513] uppercase mb-1">Dessert</h4>
          <p className="text-gray-800">Banana Fritters</p>
        </div>
      </div>

      {/* Saigon Lunch Set */}
      <div className="border border-[#5b4636] p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#5b4636] mb-4 uppercase tracking-wide">Saigon Lunch Set</h2>
        <p className="text-center text-sm text-gray-600 mb-6">2 courses (11 am – 3 pm, Mon–Fri)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-[#8B4513] mb-2 uppercase">Starters – Choose 1</h3>
            <ul className="space-y-1 text-gray-800">
              <li>Summer Rolls</li>
              <li>Pork Spring Rolls</li>
              <li>Vegetable Spring Rolls ☘</li>
              <li>Grilled Aubergine with Scallion Oil</li>
              <li>Grilled Aubergine with Minced Pork</li>
              <li>Papaya Salad</li>
              <li>Mango Salad</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#8B4513] mb-2 uppercase">Main – Choose 1</h3>
            <ul className="space-y-1 text-gray-800">
              <li>Original Beef Pho</li>
              <li>Chicken Breast Pho</li>
              <li>Buddha Noodle Soup ☘</li>
              <li>Lemongrass Chicken with Rice</li>
              <li>Pork Belly Stew with Rice</li>
              <li>Chicken Curry with Rice</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Special Order */}
      <div className="text-sm">
        <h2 className="text-2xl font-bold text-[#5b4636] mb-4 uppercase tracking-wide">Special Order</h2>
        <p className="italic text-[#A0522D] font-medium mb-4">Before 1 day</p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[#8B4513]">Seafood Hotpot</h3>
            <p className="text-gray-700">Mixed seafood (shrimp, squid, clams, fish), mushrooms, tofu, vegetables, hotpot broth, vermicelli or noodles</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#8B4513]">Fermented Fish Hotpot</h3>
            <p className="text-gray-700">Fermented fish broth (with linh or sặc fish), shrimp, squid, pork belly, vegetable, banana blossom, vermicelli or noodles</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#8B4513]">Mixed Hotpot</h3>
            <p className="text-gray-700">Beef, pork, shrimp, squid, fish balls, tofu, mushrooms, vegetables, hotpot broth, vermicelli or noodles</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-500 italic">
          Allergy info ☘ — Please tell us if you have any allergies. We handle nuts, gluten, soy, dairy & shellfish. We can’t guarantee dishes are allergen-free.
        </div>
      </div>
    </section>
  );
};

export default SetMenu;
