import React from "react";

const starters = {
  rolls: [
    {
      name: "Summer Roll",
      translation: "Gỏi cuốn",
      desc: "Vermicelli noodles, lettuce, served with hoisin/peanut sauce/ vegan sauce",
      options: "Prawn / ☘ Tofu",
      price: "7.60",
    },
    {
      name: "Pork Spring Roll",
      translation: "Chả giò",
      desc: "Minced pork, wood ear mushrooms, glass noodles, carrot, garlic, shallots, rice paper",
      price: "8.60",
    },
    {
      name: "Crab Spring Roll",
      translation: "Nem cua",
      desc: "Crab meat, ground pork, shrimp, mushrooms, glass noodles",
      price: "9.40",
    },
  ],
  salad: [
    {
      name: "Green Papaya & Prawn Salad",
      translation: "Gỏi đu đủ tôm",
      desc: "Green papaya, prawns, Thai basil, roasted peanuts, chili, fish sauce, garlic",
      price: "10.30",
    },
    {
      name: "Mango & Prawn Salad",
      translation: "Gỏi xoài tôm",
      desc: "Mango, prawns, herbs, fish sauce, peanuts, shallots",
      price: "10.30",
    },
    {
      name: "Vietnamese Beef Salad",
      translation: "Xà lách bò trộn dấm",
      desc: "Beef, onions, vinegar dressing, garlic, herbs",
      price: "12",
    },
  ],
  street: [
    {
      name: "Salt & Pepper",
      translation: "Món rang muối",
      desc: "Salt & pepper seasoning, garlic, chili.",
      options: "Squid 11.40 / Prawn 11.40 / Fish 12 / ☘ Tofu 9.70",
    },
    {
      name: "Grilled Aubergine with Scallion Oil",
      translation: "Cà tím nướng mỡ hành",
      desc: "Aubergine, scallion oil",
      price: "8.20",
    },
    {
      name: "Saigon Xeo Pancake",
      translation: "Bánh xèo",
      options: "Chicken & Prawn 11.78 / ☘ Tofu 10.90",
    },
    {
      name: "Prawn Cracker",
      price: "4",
    },
    {
      name: "Garlic Glazed Wings – Saigon Style",
      desc: "Chicken wings, Vietnamese fish sauce, garlic, sugar, chili",
      price: "9.50",
    },
    {
      name: "Grilled Aubergine with Minced Pork",
      translation: "Cà tím nướng mỡ hành thịt bằm",
      desc: "Minced pork, aubergine, scallion oil, crushed peanuts",
      price: "9.50",
    },
  ],
};

const StartersMenu = () => {
  return (
    <section className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-12 max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold text-center text-[#5b4636] mb-10 tracking-wide">Starters</h2>

      {/* Rolls */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Rolls</h3>
        {starters.rolls.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-medium text-[#5b4636]">
              <span>{item.name}</span>
              <span>£{item.price}</span>
            </div>
            {item.translation && <p className="italic text-sm text-[#8B4513]">{item.translation}</p>}
            <p className="text-sm text-gray-700">{item.desc}</p>
            {item.options && <p className="text-sm text-gray-500">{item.options}</p>}
          </div>
        ))}
      </div>

      {/* Salad */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Salad</h3>
        {starters.salad.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-medium text-[#5b4636]">
              <span>{item.name}</span>
              <span>£{item.price}</span>
            </div>
            {item.translation && <p className="italic text-sm text-[#8B4513]">{item.translation}</p>}
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Street Style */}
      <div>
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Street Style</h3>
        {starters.street.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-medium text-[#5b4636]">
              <span>{item.name}</span>
              {item.price && <span>£{item.price}</span>}
            </div>
            {item.translation && <p className="italic text-sm text-[#8B4513]">{item.translation}</p>}
            {item.desc && <p className="text-sm text-gray-700">{item.desc}</p>}
            {item.options && <p className="text-sm text-gray-500">{item.options}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartersMenu;
