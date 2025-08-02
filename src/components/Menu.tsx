import React from 'react';

const Menu: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-serif text-gray-900 bg-[#fff9ec]">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-widest">CYCLO</h1>
        <p className="uppercase text-sm tracking-widest mt-1">Vietnamese Cooking</p>
        <h2 className="mt-8 text-xl tracking-widest font-semibold">Starters</h2>
      </header>

      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-4 uppercase tracking-widest">Rolls</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Summer Roll</h4>
            <p className="italic text-sm">Gỏi cuốn</p>
            <p className="text-sm">Vermicelli noodles, lettuce, served with hoisin/peanut sauce/vegan sauce</p>
            <p className="text-xs mt-1">🍤 Prawn &nbsp; 🌱 Tofu</p>
          </div>
          <div>
            <h4 className="font-semibold">Pork Spring Roll</h4>
            <p className="italic text-sm">Chả giò</p>
            <p className="text-sm">Minced pork, wood ear mushrooms, glass noodles, carrot, garlic, shallots, rice paper</p>
          </div>
          <div>
            <h4 className="font-semibold">Crab Spring Roll</h4>
            <p className="italic text-sm">Nem cua</p>
            <p className="text-sm">Crab meat, ground pork, shrimp, mushrooms, glass noodles</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-4 uppercase tracking-widest">Salad</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Green Papaya & Prawn Salad</h4>
            <p className="italic text-sm">Gỏi đu đủ tôm</p>
            <p className="text-sm">Green papaya, prawns, Thai basil, roasted peanuts, chili, fish sauce, garlic</p>
          </div>
          <div>
            <h4 className="font-semibold">Vietnamese Beef Salad</h4>
            <p className="italic text-sm">Xà lách bò trộn dầu giấm</p>
            <p className="text-sm">Beef, onions, vinegar dressing, garlic, herbs</p>
          </div>
          <div>
            <h4 className="font-semibold">Mango & Prawn Salad</h4>
            <p className="italic text-sm">Gỏi xoài tôm</p>
            <p className="text-sm">Mango, prawns, herbs, fish sauce, peanuts, shallots</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 uppercase tracking-widest">Street Style</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Salt & Pepper</h4>
            <p className="italic text-sm">Món rang muối</p>
            <p className="text-sm">Salt & pepper seasoning, garlic, chili</p>
            <p className="text-xs mt-1">🦑 Squid &nbsp; 🍤 Prawn &nbsp; 🍗 Chicken &nbsp; 🌱 Tofu</p>
          </div>
          <div>
            <h4 className="font-semibold">Grilled Eggplant with Scallion Oil</h4>
            <p className="italic text-sm">Cà tím nướng mỡ hành</p>
            <p className="text-sm">Aubergine, scallion oil</p>
          </div>
          <div>
            <h4 className="font-semibold">Saigon Xeo Pancake</h4>
            <p className="italic text-sm">Bánh xèo</p>
            <p className="text-sm">🌱 Tofu &nbsp; 🍗 Chicken &nbsp; 🍤 Prawn</p>
          </div>
          <div>
            <h4 className="font-semibold">Prawn Cracker</h4>
          </div>
          <div>
            <h4 className="font-semibold">Garlic Glazed Wings - Saigon Style</h4>
            <p className="text-sm">Chicken wings, Vietnamese fish sauce, garlic, sugar, chili</p>
          </div>
          <div>
            <h4 className="font-semibold">Grilled Aubergine with Minced Pork</h4>
            <p className="italic text-sm">Cà tím nướng mỡ hành thịt bằm</p>
            <p className="text-sm">Minced pork, aubergine, scallion oil, crushed peanuts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
