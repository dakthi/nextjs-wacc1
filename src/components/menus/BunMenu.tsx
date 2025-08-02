import React from "react";

const bunMenu = {
  vermicelliBowls: [
    {
      name: "Hà Nội BBQ Pork",
      translation: "Bún chả Hà Nội",
      desc: "Grilled pork patties with vermicelli noodles, pickled papaya, fresh herbs, and dipping sauce",
      price: "15.60",
    },
    {
      name: "Spicy Lemongrass Chicken Vermicelli",
      translation: "Bún gà xả ớt",
      desc: "Grilled lemongrass chicken over vermicelli with herbs, peanuts, and sweet chili sauce",
      price: "14.60",
    },
    {
      name: "Hanoi Grilled Fish Vermicelli",
      translation: "Bún chả cá Lã Vọng",
      desc: "Grilled fish with turmeric and dill over vermicelli with herbs and dipping sauce",
      price: "14.60",
    },
    {
      name: "Saigon Bowl",
      translation: "Bún thịt nướng, chả giò",
      desc: "Crab spring roll, pork spring roll with vermicelli noodles, pickled papaya, fresh herbs, and dipping sauce",
      price: "15.60",
    },
  ],
  stirFried: {
    name: "Stir-Fried Vermicelli",
    translation: "Bún xào",
    desc: "Wok-fried vermicelli noodles with vegetables",
    options: [
      { label: "Pork", price: "14.10" },
      { label: "Beef", price: "14.10" },
      { label: "Seafood", price: "14.63" },
      { label: "☘ Tofu", price: "13.50" },
    ],
  },
  seafood: [
    {
      name: "Crab Meat Noodle Soup",
      translation: "Bún Riêu Cua",
      desc: "Tomato broth with fresh crab paste, silky tofu, vermicelli, herbs, and crispy shallots",
      price: "14.63",
    },
    {
      name: "Fried Fish Noodle Soup",
      translation: "Bún Cá Cá Can",
      desc: "Crispy fried fish fillet, tangy fish broth with tomato, pineapple, and fresh herbs",
      price: "14.63",
    },
    {
      name: "Vegetarian Crab Noodle Soup ☘",
      translation: "Bún Riêu Tofu Chay",
      desc: "Tomato broth with tofu, veggie crab flavor, vermicelli",
      price: "14.10",
    },
  ],
  desserts: [
    {
      name: "Midnight Bean & Coconut Dream",
      translation: "Chè đậu đen nước cốt dừa",
      desc: "Slow-simmered black beans in sweet coconut cream, served chilled with herbal jelly",
      price: "7",
    },
    {
      name: "Herbal Garden Delight",
      translation: "Chè Sâm Bổ Lượng",
      desc: "A sweet soup with dried longan, red jujube, lotus seeds, seaweed, and herbal jelly",
      price: "6.50",
    },
    {
      name: "Floating Rice Dumplings in Ginger Bliss",
      translation: "Chè trôi nước",
      desc: "Soft sticky rice balls filled with black sesame or red bean, swimming in warm ginger syrup and creamy coconut milk",
      price: "7",
    },
    {
      name: "Banana Fritters",
      translation: "Chuối chiên với kem",
      desc: "Deep-fried banana, vanilla ice cream and chocolate sauce",
      price: "7",
    },
    {
      name: "Ice Cream",
      desc: "Vanilla / Chocolate / Salted Caramel",
      price: "3",
    },
  ],
};

const BunMenu = () => {
  return (
    <section className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-12 max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold text-center text-[#5b4636] mb-10 tracking-wide">Bún</h2>

      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8 text-sm text-gray-700">
        <p>
          <strong>Vermicelli dishes:</strong> Bún is a vibrant symphony of textures and flavors—delicate vermicelli noodles meet fresh, aromatic herbs and crisp vegetables. Each bite reveals a harmonious balance of savory grilled meats or crispy spring rolls, bright pickles, and a splash of tangy, fragrant fish sauce.
        </p>
      </div>

      {/* Vermicelli Bowls */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Vermicelli Bowls</h3>
        {bunMenu.vermicelliBowls.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-medium text-[#5b4636]">
              <span>{item.name}</span>
              <span>£{item.price}</span>
            </div>
            <p className="italic text-sm text-[#8B4513]">{item.translation}</p>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Stir-Fried Vermicelli */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-2 uppercase">{bunMenu.stirFried.name}</h3>
        <p className="italic text-sm text-[#8B4513] mb-1">{bunMenu.stirFried.translation}</p>
        <p className="text-sm text-gray-700 mb-2">{bunMenu.stirFried.desc}</p>
        <ul className="text-sm space-y-1">
          {bunMenu.stirFried.options.map((opt, i) => (
            <li key={i} className="flex justify-between text-gray-800">
              <span>{opt.label}</span>
              <span>£{opt.price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Seafood Soups */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Seafood</h3>
        {bunMenu.seafood.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-medium text-[#5b4636]">
              <span>{item.name}</span>
              <span>£{item.price}</span>
            </div>
            {item.translation && (
              <p className="italic text-sm text-[#8B4513]">{item.translation}</p>
            )}
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Desserts */}
      <div className="border border-[#d7c3a3] bg-[#fff6e5] p-6 rounded shadow-sm mb-6">
        <h3 className="text-xl font-bold text-[#5b4636] uppercase text-center mb-2">Chè</h3>
        <p className="text-sm text-center text-gray-700 mb-4">
          &ldquo;Chè&ldquo; is a traditional Vietnamese sweet dessert, showcasing the richness of local ingredients like beans, fruits, and herbs, served either hot or cold.
        </p>
        <div>
          {bunMenu.desserts.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-medium text-[#5b4636]">
                <span>{item.name}</span>
                <span>£{item.price}</span>
              </div>
              {item.translation && (
                <p className="italic text-sm text-[#8B4513]">{item.translation}</p>
              )}
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BunMenu;
