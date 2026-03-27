"use client";

import { useState } from "react";
import { faqItems } from "@/lib/faq-data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="mb-20 border-t border-alinea-100 pt-16">
      <h2
        className="text-2xl md:text-3xl font-bold text-alinea-950 tracking-tight mb-10 text-center"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Questions fréquentes
      </h2>
      <div className="divide-y divide-alinea-100">
        {faqItems.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              aria-expanded={openIndex === i}
            >
              <span className="text-[15px] font-semibold text-alinea-900 group-hover:text-accent-dark transition-colors pr-4">
                {item.question}
              </span>
              <span
                className="text-alinea-400 text-xl flex-shrink-0 transition-transform duration-200"
                style={{
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-200"
              style={{
                maxHeight: openIndex === i ? "200px" : "0",
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <p className="pb-5 text-[15px] text-alinea-500 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
