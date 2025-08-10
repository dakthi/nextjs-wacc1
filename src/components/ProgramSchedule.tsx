import React from "react";

interface ScheduleItem {
  name: string;
  subtitle?: string;
  description?: string;
  schedule: string | string[];
  price?: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  ageGroup?: string;
  instructor?: string;
}

interface ScheduleSection {
  title: string;
  items: ScheduleItem[];
}

interface ProgramScheduleProps {
  title: string;
  sections: ScheduleSection[];
  bgColor?: string;
  textColor?: string;
}

const ProgramSchedule: React.FC<ProgramScheduleProps> = ({
  title,
  sections,
  bgColor = "bg-primary-50",
  textColor = "text-gray-800"
}) => {
  return (
    <section className={`${bgColor} ${textColor} font-sans px-6 py-12 max-w-6xl mx-auto rounded-2xl`}>
      <h2 className="text-3xl font-heading font-bold text-center text-primary-600 mb-10 uppercase tracking-tight">
        {title}
      </h2>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-12 last:mb-0">
          <h3 className="text-xl font-heading font-bold text-primary-600 mb-6 uppercase tracking-wide border-b-2 border-primary-200 pb-2">
            {section.title}
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-primary-600">{item.name}</h4>
                  {item.price && <span className="text-lg font-bold text-primary-800">{item.price}</span>}
                </div>
                {item.subtitle && <p className="text-sm text-primary-500 italic mb-2">{item.subtitle}</p>}
                {item.description && <p className="text-sm text-gray-700 mb-4">{item.description}</p>}

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                  <div className="col-span-2 font-semibold text-gray-800">📅 Schedule:</div>
                  {Array.isArray(item.schedule) ? (
                    item.schedule.map((time, timeIndex) => (
                      <span key={timeIndex} className="col-span-2 text-gray-700 pl-4">{time}</span>
                    ))
                  ) : (
                    <span className="col-span-2 text-gray-700 pl-4">{item.schedule}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {item.ageGroup && (
                    <>
                      <span className="font-medium text-gray-600">👥 Age Group:</span>
                      <span className="text-gray-700">{item.ageGroup}</span>
                    </>
                  )}
                  {item.instructor && (
                    <>
                      <span className="font-medium text-gray-600">👨‍🏫 Instructor:</span>
                      <span className="text-gray-700">{item.instructor}</span>
                    </>
                  )}
                </div>

                {item.contact?.website && (
                  <div className="mt-4 pt-3 border-t border-gray-200 text-xs space-y-1">
                    <p className="font-medium text-gray-600">More Information:</p>
                    <p>🌐 {item.contact.website}</p>
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

export default ProgramSchedule;
