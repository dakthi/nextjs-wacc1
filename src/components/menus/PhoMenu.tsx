import React from "react";

const phoMenu = {
  beef: [
    {
      name: "Original Pho",
      translation: 'Phở bò tái / "fuh bo tie"',
      desc: "Slow-simmered beef bone broth, rare beef slices, rice noodles, scallions, onions",
      price: "14.25",
    },
    {
      name: "Triple Beef Delight Pho",
      translation: "Phở tái nạm gầu / fuh tie nahm gow",
      desc: "Hearty beef broth, rare beef, brisket, and flavorful flank cuts, rice noodles, green onion, and fresh coriander",
      price: "15.20",
    },
    {
      name: "Sautéed Rare Beef Pho",
      translation: "Phở tái lăn / fuh tie lun",
      desc: "Rice noodles, rare beef, brisket, flank, tendon, beef meatballs, beef broth, onions, herbs",
      price: "15.20",
    },
    {
      name: "Meatball Pho",
      translation: "Phở bò viên / fuh baw vee-en",
      desc: "Beef bone broth, tender rare beef slices, and traditional Vietnamese beef meatballs, rice noodles, coriander",
      price: "15.20",
    },
    {
      name: "Five-Combo Pho",
      translation: "Phở đặc biệt / fuh dak byet",
      desc: "Beef bone broth, rare beef, brisket, flank, tendon, beef meatballs, and rice noodles",
      price: "20.90",
    },
  ],
  chicken: [
    {
      name: "Chicken Breast Pho",
      translation: "Phở ức gà / fuh uck gah",
      desc: "Chicken broth with chicken breast, rice noodles, and fresh coriander",
      price: "13.50",
    },
    {
      name: "Chicken Thigh Pho",
      translation: "Phở đùi gà / fuh doo-ee gah",
      desc: "Chicken broth with tender chicken thigh, rice noodles",
      price: "14.00",
    },
  ],
  signature: {
    name: "Premium Beef Stone Bowl Pho",
    desc: "Premium beef served in a sizzling hot stone bowl with rich beef broth, rice noodles, scallions, aromatic herbs, and a touch of chili",
    price: "22.00",
  },
  brothyBunBowls: [
    {
      name: "Spicy Beef & Pork Hock Noodle Soup",
      translation: "Bún bò Huế",
      desc: "Spicy beef broth with tender beef shank, pork hock, thick noodles, and chili oil",
      price: "14.60",
    },
    {
      name: "Buddha Noodle Soup",
      translation: "Bún Huế Nam chay",
      desc: "Lemongrass broth with tofu, mushrooms, thick noodles, and fragrant herbs",
      price: "13.70",
    },
  ],
  toppings: [
    { name: "Egg Yolk", price: "3.10" },
    { name: "Steak Bowl", price: "6.40" },
    { name: "Crunchy Flank", price: "4.50" },
    { name: "Meatball", price: "5.50" },
    { name: "Shredded Chicken", price: "4.00" },
    { name: "Extra Noodle", price: "3.60" },
    { name: "Extra Broth", price: "4.00" },
    { name: "Crispy Dough Stick", price: "3.20" },
  ],
};

const PhoMenu = () => {
  return (
    <section className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-12 max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold text-center text-[#5b4636] mb-10 tracking-wide">Phở</h2>

      {/* BEEF PHO */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Beef</h3>
        {phoMenu.beef.map((item, i) => (
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

      {/* SIGNATURE BOWL */}
      <div className="border border-[#5b4636] p-6 mb-10 bg-[#fff6e5] shadow-sm">
        <h3 className="font-bold text-[#5b4636] text-center uppercase mb-2">Cyclo Signature</h3>
        <h4 className="text-lg font-semibold text-center mb-1">{phoMenu.signature.name}</h4>
        <p className="text-sm text-center text-gray-700 mb-1">{phoMenu.signature.desc}</p>
        <p className="text-center font-semibold text-[#5b4636]">£{phoMenu.signature.price}</p>
      </div>

      {/* CHICKEN PHO */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Chicken</h3>
        {phoMenu.chicken.map((item, i) => (
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

      {/* BROTHY BUN BOWLS */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Brothy Bun Bowls</h3>
        {phoMenu.brothyBunBowls.map((item, i) => (
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

      {/* EXTRA TOPPINGS */}
      <div>
        <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">Extra Toppings</h3>
        <ul className="grid grid-cols-2 gap-x-16 text-sm">
          {phoMenu.toppings.map((item, i) => (
            <li key={i} className="flex items-center text-gray-800">
              <span className="whitespace-nowrap">{item.name}</span>
              <div className="flex-grow border-b border-dotted mx-2 border-gray-400" />
              <span className="font-semibold text-[#5b4636] whitespace-nowrap">£{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PhoMenu;
