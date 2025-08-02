"use client";

import React from "react";

type DrinkItem = {
  name: string;
  price: string;
  translation?: string;
  desc?: string;
};

const drinks: Record<string, DrinkItem[]> = {
  coffee: [
    { name: "Latte", price: "3.50" },
    { name: "Cappuccino", price: "3.50" },
    { name: "Americano", price: "3.50" },
    { name: "Mocha", price: "3.50" },
    { name: "Espresso", price: "3.50" },
  ],
  houseSpecial: [
    { name: "Homemade Lemonade", translation: "Nước chanh tươi", price: "4" },
    { name: "Avocado Smoothie", translation: "Sinh tố bơ", price: "6" },
    { name: "Strawberry Smoothie", translation: "Sinh tố dâu", price: "6" },
  ],
  vietnameseCoffee: [
    { name: "Black Coffee", translation: "Cà phê đen đá/nóng", price: "3.80 / 4" },
    { name: "Brown Coffee w/ Condensed Milk", translation: "Cà phê sữa đá/nóng", price: "4" },
    { name: "Bạc Xỉu", translation: "Milk coffee w/ a splash of coffee", price: "4" },
  ],
  softDrinks: [
    { name: "Sparkling Water (500ml)", price: "2" },
    { name: "Still Water (500ml)", price: "2" },
    { name: "Diet Coke", price: "3.30" },
    { name: "Coke", price: "3.30" },
    { name: "Sprite", price: "3.30" },
    { name: "Tonic Water (Fever Tree)", price: "2" },
    { name: "Soda Water (Fever Tree)", price: "2" },
    { name: "Fruit Juice", translation: "Orange / Apple / Coconut", price: "3.30" },
  ],
  mocktail: [
    {
      name: "Saigon Breeze",
      desc: "A refreshing, Saigon-inspired mocktail with lychee, lime, Thai basil, and a hint of chili. Topped with soda for a cool, zesty finish.",
      price: "6",
    },
  ],
  tea: [
    { name: "Lotus Tea", price: "3" },
    { name: "Green Tea", price: "3" },
    { name: "Oolong Tea", price: "3" },
    { name: "Jasmine Tea", price: "3" },
  ],
};

const DrinksMenu = () => {
  return (
    <div className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center text-[#5b4636] mb-12 tracking-wide">
        Cyclo&apos;s Drinks
      </h1>

      <div className="space-y-12">
        {Object.entries(drinks).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-bold text-[#8B4513] uppercase mb-6 tracking-wide">
              {category.replace(/([A-Z])/g, " $1")}
            </h2>

            {items.map((item, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-semibold text-[#3b2f23]">{item.name}</h4>
                    {item.translation && (
                      <p className="italic text-sm text-[#8B4513]">{item.translation}</p>
                    )}
                    {item.desc && (
                      <p className="text-sm text-[#374151] mt-1">{item.desc}</p>
                    )}
                  </div>
                  {item.price && (
                    <span className="text-sm font-semibold text-[#5b4636] whitespace-nowrap mt-1">
                      £{item.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinksMenu;
