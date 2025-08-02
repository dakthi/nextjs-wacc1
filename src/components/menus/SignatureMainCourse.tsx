import React from "react";

const signatureMenu = {
  baguetteAndSizzling: [
    {
      name: "Sizzling Beef",
      translation: "Bò né",
      desc: "Beef slices, pâté, fried egg, onion, butter, baguette",
      price: "15.90",
    },
    {
      name: "Chargrilled Pork Banh Mi",
      translation: "Bánh mì thịt nướng",
      desc: "Pork slices, fried egg, cucumber, coriander, chili, mayonnaise, baguette",
      price: "11.10",
    },
    {
      name: "Beef Stew Banh Mi",
      translation: "Bánh mì bò kho",
      desc: "Braised beef stew, carrot, lemongrass, baguette",
      price: "11.10",
    },
    {
      name: "Vietnamese Special Banh Mi",
      translation: "Bánh mì Pâté",
      desc: "Pâté, cold cuts, pickled carrots, cucumber, coriander, chili, mayonnaise, baguette",
      options: "+ Vietnamese Ham: 1.50",
      price: "11.10",
    },
  ],
  special: [
    {
      name: "Pork Belly Stew",
      translation: "Thịt kho trứng",
      desc: "Tender pork belly and eggs simmered in savory-sweet coconut sauce",
      price: "13.50",
    },
    {
      name: "Shaking Beef",
      translation: "Bò lúc lắc",
      desc: "Seared beef cubes with bell peppers and garlic soy glaze",
      price: "14.60",
    },
    {
      name: "Lemongrass Chilli Chicken",
      translation: "Gà xào sả ớt",
      desc: "Wok-fried chicken with lemongrass, garlic, and fresh chili",
      price: "13.70",
    },
    {
      name: "Coconut Chicken Curry",
      translation: "Gà ri cà ri nước dừa",
      desc: "Southern-style chicken curry with coconut milk and potato",
      price: "13.50",
    },
    {
      name: "Salmon Clay Pot",
      translation: "Cá hồi kho tộ",
      desc: "Phu Quoc peppers, pineapple, pork, caramel sauce",
      price: "14.63",
    },
    {
      name: "Steamed Sea Bass with Soy Sauce",
      translation: "Cá hấp xì dầu",
      desc: "Whole sea bass, ginger, spring onions, soy sauce, sesame oil, coriander",
      price: "17.60",
    },
  ],
  cycloSpecial: [
    {
      name: "Hoi An Heritage Noodles",
      translation: "Mì Quảng Hội An",
      desc: "Turmeric rice noodles with shrimp, pork, fresh herbs, peanuts, crispy rice crackers in light broth",
      price: "14.60",
    },
    {
      name: "Cơm Tấm Saigon",
      desc: "Chargrilled pork chop with broken rice and scallion oil",
      options: "+ Fried egg: 1.50",
      price: "15.60",
    },
    {
      name: "Hoi An Chicken Rice",
      translation: "Cơm gà Hội An",
      desc: "Shredded poached chicken, fragrant rice cooked in chicken broth, herbs, pickles, and chili sauce",
      price: "12.54",
    },
  ],
  sides: [
    { name: "Jasmine Rice", price: "3.90" },
    { name: "Egg Fried Rice", price: "4.75" },
    { name: "Buddha Fried Rice", price: "6.27" },
    { name: "Seafood Fried Rice", price: "9.40" },
    { name: "Special Fried Rice", price: "8.30" },
  ],
  vegetables: [
    { name: "Stir-Fried Morning Glory", price: "8.90" },
    { name: "Stir-Fried Choy Sum with Tofu", price: "8.90" },
    { name: "Stir-Fried Bok Choy", price: "8.50" },
    { name: "Stir-Fried Seasonal Vegetables", price: "8.50" },
  ],
};

const SignatureMainCourseMenu = () => {
  return (
    <section className="bg-[#fff9ec] text-[#1b1b1b] font-serif px-6 py-12 max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold text-center text-[#5b4636] mb-10 tracking-wide">
        Signature Main Course
      </h2>

      {/* Helper for rendering sections */}
      {Object.entries(signatureMenu).map(([section, items]) => (
        <div key={section} className="mb-10">
          <h3 className="text-xl font-bold text-[#8B4513] mb-4 uppercase">
            {section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </h3>
          {(items as any[]).map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between font-medium text-[#5b4636]">
                <span>{item.name}</span>
                <span>£{item.price}</span>
              </div>
              {item.translation && (
                <p className="italic text-sm text-[#8B4513]">{item.translation}</p>
              )}
              {item.desc && (
                <p className="text-sm text-gray-700">{item.desc}</p>
              )}
              {item.options && (
                <p className="text-sm text-gray-500">{item.options}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default SignatureMainCourseMenu;
