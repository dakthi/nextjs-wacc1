import React from "react";

interface ServiceItem {
  name: string;
  subtitle?: string;
  description: string;
  price?: string;
  options?: string;
  features?: string[];
  duration?: string;
}

interface ServiceSection {
  title: string;
  items: ServiceItem[];
}

interface ServicesMenuProps {
  title: string;
  sections: ServiceSection[];
  bgColor?: string;
  accentColor?: string;
}

const ServicesMenu: React.FC<ServicesMenuProps> = ({
  title,
  sections,
  bgColor = "bg-gray-50",
  accentColor = "text-primary-600"
}) => {
  return (
    <section className={`${bgColor} font-sans px-6 py-12 max-w-5xl mx-auto rounded-2xl`}>
      <h2 className={`text-3xl font-heading font-bold text-center ${accentColor} mb-10 uppercase tracking-tight`}>
        {title}
      </h2>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-12 last:mb-0">
          <h3 className={`text-xl font-heading font-bold ${accentColor} mb-6 uppercase tracking-wide`}>
            {section.title}
          </h3>
          
          <div className="space-y-6">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold ${accentColor} mb-1`}>
                      {item.name}
                    </h4>
                    {item.subtitle && (
                      <p className="text-sm text-gray-500 italic mb-2">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right ml-4">
                    {item.price && (
                      <span className={`text-xl font-bold ${accentColor}`}>
                        {item.price}
                      </span>
                    )}
                    {item.duration && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.duration}
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">
                  {item.description}
                </p>
                
                {item.options && (
                  <p className="text-sm text-gray-600 mb-3 italic">
                    Options: {item.options}
                  </p>
                )}
                
                {item.features && item.features.length > 0 && (
                  <div className="border-t border-gray-200 pt-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Includes:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServicesMenu;