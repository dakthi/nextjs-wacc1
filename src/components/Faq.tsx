import React from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { prisma } from "@/lib/prisma";

interface DatabaseFaqItem {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  imageUrl: string | null;
  displayOrder: number;
  active: boolean;
}

interface FaqSection {
  title: string;
  items: DatabaseFaqItem[];
}

async function getFaqItems(): Promise<DatabaseFaqItem[]> {
  try {
    const faqItems = await prisma.faqItem.findMany({
      where: { active: true },
      orderBy: [
        { category: 'asc' },
        { displayOrder: 'asc' },
        { id: 'asc' }
      ]
    });
    return faqItems;
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    return [];
  }
}

function organizeFaqsByCategory(faqItems: DatabaseFaqItem[]): FaqSection[] {
  const sections: { [key: string]: DatabaseFaqItem[] } = {};
  
  faqItems.forEach(item => {
    const category = item.category || 'General';
    if (!sections[category]) {
      sections[category] = [];
    }
    sections[category]!.push(item);
  });

  return Object.entries(sections).map(([title, items]) => ({
    title,
    items
  }));
}

export default async function Faq() {
  const faqItems = await getFaqItems();
  const faqSections = organizeFaqsByCategory(faqItems);

  if (faqSections.length === 0) {
    return null;
  }

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-4 uppercase tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our programmes, facilities, and services.
        </p>
      </div>

      <div className="space-y-12">
        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-2xl font-heading font-bold text-primary-600 mb-8 text-center uppercase tracking-wide">
              {section.title}
            </h3>
            
            <div className="grid gap-6 max-w-4xl mx-auto">
              {section.items.map((item) => (
                <Disclosure key={item.id} as="div" className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between w-full px-6 py-4 text-lg text-left text-gray-800 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-50 transition-colors">
                        <span className="font-semibold">{item.question}</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-primary-500 transition-transform duration-200`}
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="px-6 pb-6 pt-2">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="prose prose-sm max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </div>
                          </div>
                          {item.imageUrl && (
                            <div className="flex justify-center md:justify-end">
                              <div className="w-full max-w-sm">
                                <Image
                                  src={item.imageUrl}
                                  alt={`Image for ${item.question}`}
                                  width={300}
                                  height={200}
                                  className="rounded-lg shadow-sm object-cover w-full h-48"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}